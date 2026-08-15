import type { FeedbackFormValues } from "@/components/FeedbackForm/FeedbackForm";
import {
  PERSONAS,
  ReviewFeedbackSchema,
  ReviewRequestSchema,
  WRITING_TYPES,
  type ReviewFeedback,
  type ReviewRequest,
} from "@/types/review";

export const REVIEW_STORAGE_KEY = "beta-readr-review-workspace";

export type SavedReviewWorkspace = {
  formValues: FeedbackFormValues;
  lastRequest: ReviewRequest | null;
  feedback: ReviewFeedback | null;
};

type StoredReviewWorkspace = SavedReviewWorkspace & { version: 1 };

export function readSavedReview(): SavedReviewWorkspace | null {
  const stored = localStorage.getItem(REVIEW_STORAGE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored) as unknown;
    if (!isRecord(parsed) || parsed.version !== 1) return null;

    const formValues = parseFormValues(parsed.formValues);
    if (!formValues) return null;

    const requestResult = parsed.lastRequest
      ? ReviewRequestSchema.safeParse(parsed.lastRequest)
      : null;
    const feedbackResult = parsed.feedback
      ? ReviewFeedbackSchema.safeParse(parsed.feedback)
      : null;

    if (parsed.lastRequest && !requestResult?.success) return null;
    if (parsed.feedback && !feedbackResult?.success) return null;

    return {
      formValues,
      lastRequest: requestResult?.success ? requestResult.data : null,
      feedback: feedbackResult?.success ? feedbackResult.data : null,
    };
  } catch {
    return null;
  }
}

export function saveReview(state: SavedReviewWorkspace) {
  const stored: StoredReviewWorkspace = { version: 1, ...state };
  try {
    localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Browser storage can be unavailable or full. The review still works for
    // the current session even when persistence is not possible.
  }
}

export function clearSavedReview() {
  localStorage.removeItem(REVIEW_STORAGE_KEY);
}

export function requestFromFormValues(values: FeedbackFormValues): ReviewRequest {
  const text =
    values.submission.method === "paste"
      ? values.submission.pastedText
      : (values.submission.file?.extractedText ?? "");

  return {
    title: values.title || undefined,
    writingType: values.writingType || undefined,
    text,
    context: values.context || undefined,
    requestedFocus: values.requestedFocus || undefined,
    persona: values.persona || "supportive-writing-coach",
  };
}

export function requestsMatch(
  current: ReviewRequest,
  submitted: ReviewRequest | null,
) {
  return Boolean(submitted) && JSON.stringify(current) === JSON.stringify(submitted);
}

function parseFormValues(value: unknown): FeedbackFormValues | null {
  if (!isRecord(value) || !isRecord(value.submission)) return null;

  const { submission } = value;
  if (submission.method !== "paste" && submission.method !== "upload") return null;
  if (typeof submission.pastedText !== "string") return null;

  let file: FeedbackFormValues["submission"]["file"] = null;
  if (submission.file !== null) {
    if (
      !isRecord(submission.file) ||
      typeof submission.file.name !== "string" ||
      typeof submission.file.extension !== "string" ||
      typeof submission.file.extractedText !== "string"
    ) {
      return null;
    }
    file = {
      name: submission.file.name,
      extension: submission.file.extension,
      extractedText: submission.file.extractedText,
    };
  }

  if (
    typeof value.title !== "string" ||
    typeof value.context !== "string" ||
    typeof value.requestedFocus !== "string" ||
    (value.writingType !== "" &&
      !WRITING_TYPES.includes(value.writingType as (typeof WRITING_TYPES)[number])) ||
    (value.persona !== "" &&
      !PERSONAS.includes(value.persona as (typeof PERSONAS)[number]))
  ) {
    return null;
  }

  return {
    title: value.title,
    writingType: value.writingType as FeedbackFormValues["writingType"],
    context: value.context,
    requestedFocus: value.requestedFocus,
    persona: value.persona as FeedbackFormValues["persona"],
    submission: { method: submission.method, pastedText: submission.pastedText, file },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
