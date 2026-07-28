import OpenAI, {
  APIConnectionTimeoutError,
  APIError,
  AuthenticationError,
  RateLimitError,
} from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import {
  ReviewFeedbackSchema,
  type ReviewFeedback,
  type ReviewRequest,
} from "@/types/review";
import { buildReviewUserMessage, buildSystemMessage } from "@/lib/prompts";

const DEFAULT_MODEL = "gpt-4.1-mini";
const REQUEST_TIMEOUT_MS = 60_000;

/** A safe-to-display error. `code` is for internal logging/telemetry only. */
export class ReviewGenerationError extends Error {
  readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "ReviewGenerationError";
    this.code = code;
  }
}

let cachedClient: OpenAI | null = null;

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new ReviewGenerationError(
      "betaReadr isn't configured to generate feedback yet. The site owner needs to set an OPENAI_API_KEY.",
      "missing-api-key",
    );
  }
  if (!cachedClient) {
    cachedClient = new OpenAI({ apiKey, timeout: REQUEST_TIMEOUT_MS });
  }
  return cachedClient;
}

/**
 * Sends a submission to the configured OpenAI model and returns validated,
 * structured feedback. Throws ReviewGenerationError with a message that is
 * always safe to show to the writer directly.
 */
export async function generateReview(
  request: ReviewRequest,
): Promise<ReviewFeedback> {
  const client = getClient();
  const model = process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;

  let response;
  try {
    response = await client.responses.parse({
      model,
      input: [
        { role: "system", content: buildSystemMessage(request.persona) },
        { role: "user", content: buildReviewUserMessage(request) },
      ],
      text: { format: zodTextFormat(ReviewFeedbackSchema, "review_feedback") },
    });
  } catch (err) {
    throw toReviewGenerationError(err);
  }

  const refusalMessage = response.output
    .filter(
      (item): item is Extract<typeof item, { type: "message" }> =>
        item.type === "message",
    )
    .flatMap((item) => item.content)
    .find(
      (content): content is Extract<typeof content, { type: "refusal" }> =>
        content.type === "refusal",
    );

  if (refusalMessage) {
    throw new ReviewGenerationError(
      "The reviewer wasn't able to give feedback on this submission. Please make sure it's a piece of writing and try again.",
      "refused",
    );
  }

  const parsed = response.output_parsed;
  if (!parsed) {
    throw new ReviewGenerationError(
      "betaReadr didn't receive usable feedback for this submission. Please try again in a moment.",
      "empty-response",
    );
  }

  const validated = ReviewFeedbackSchema.safeParse(parsed);
  if (!validated.success) {
    throw new ReviewGenerationError(
      "betaReadr received a response that didn't match the expected format. Please try again.",
      "invalid-schema",
    );
  }

  return validated.data;
}

function toReviewGenerationError(err: unknown): ReviewGenerationError {
  if (err instanceof ReviewGenerationError) return err;

  if (err instanceof AuthenticationError) {
    return new ReviewGenerationError(
      "betaReadr's connection to its AI provider isn't configured correctly.",
      "auth-error",
    );
  }

  if (err instanceof RateLimitError) {
    return new ReviewGenerationError(
      "betaReadr is getting a lot of requests right now. Please wait a moment and try again.",
      "rate-limited",
    );
  }

  if (err instanceof APIConnectionTimeoutError) {
    return new ReviewGenerationError(
      "Generating feedback took longer than expected. Please try again.",
      "timeout",
    );
  }

  if (err instanceof APIError) {
    if (err.status && err.status >= 500) {
      return new ReviewGenerationError(
        "betaReadr's AI provider is temporarily unavailable. Please try again shortly.",
        "provider-error",
      );
    }
    return new ReviewGenerationError(
      "betaReadr couldn't generate feedback for this submission. Please try again.",
      "api-error",
    );
  }

  return new ReviewGenerationError(
    "Something went wrong while generating feedback. Please try again.",
    "unknown",
  );
}
