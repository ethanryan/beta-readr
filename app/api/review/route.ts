import { NextResponse } from "next/server";
import { ReviewRequestSchema, type ReviewApiResponse } from "@/types/review";
import { validateSubmission } from "@/lib/validation";
import { generateReview, ReviewGenerationError } from "@/lib/openai";

export const runtime = "nodejs";

function jsonError(message: string, status: number) {
  const body: ReviewApiResponse = { ok: false, error: message };
  return NextResponse.json(body, { status });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError(
      "betaReadr couldn't read that submission. Please try again.",
      400,
    );
  }

  // Extract fields loosely first so validateSubmission can give
  // field-specific, friendly messages before Zod's stricter enum checks.
  const raw = (body ?? {}) as Record<string, unknown>;
  const submission = {
    title: typeof raw.title === "string" ? raw.title : undefined,
    writingType: typeof raw.writingType === "string" ? raw.writingType : undefined,
    text: typeof raw.text === "string" ? raw.text : "",
    context: typeof raw.context === "string" ? raw.context : undefined,
    requestedFocus:
      typeof raw.requestedFocus === "string" ? raw.requestedFocus : undefined,
    persona: typeof raw.persona === "string" ? raw.persona : undefined,
  };

  const { errors } = validateSubmission(submission);
  if (errors.length > 0) {
    return jsonError(errors[0].message, 400);
  }

  const result = ReviewRequestSchema.safeParse(submission);
  if (!result.success) {
    return jsonError(
      "That submission is missing some required information. Please check the form and try again.",
      400,
    );
  }

  try {
    const feedback = await generateReview(result.data);
    const responseBody: ReviewApiResponse = { ok: true, feedback };
    return NextResponse.json(responseBody, { status: 200 });
  } catch (err) {
    if (err instanceof ReviewGenerationError) {
      const status =
        err.code === "missing-api-key" ||
        err.code === "auth-error" ||
        err.code === "model-access-denied"
          ? 500
          : err.code === "rate-limited"
            ? 429
            : err.code === "timeout"
              ? 504
              : 502;
      // Log internally without the submitted writing content. `cause` (when
      // present) carries the underlying provider error message for
      // diagnosing misconfiguration — never sent to the client.
      console.error("[api/review] generation failed", {
        code: err.code,
        writingType: result.data.writingType,
        persona: result.data.persona,
        cause: err.cause instanceof Error ? err.cause.message : undefined,
      });
      return jsonError(err.message, status);
    }

    console.error("[api/review] unexpected error", err);
    return jsonError(
      "Something unexpected happened while generating feedback. Please try again.",
      500,
    );
  }
}
