import { PERSONAS, WRITING_TYPES } from "@/types/review";
import { SUBMISSION_LIMITS, SUPPORTED_UPLOAD_EXTENSIONS } from "@/lib/reviewTypes";

export type ValidationIssue = {
  field: "title" | "writingType" | "text" | "context" | "requestedFocus" | "persona" | "file";
  message: string;
};

export type SubmissionInput = {
  title?: string;
  writingType?: string;
  text: string;
  context?: string;
  requestedFocus?: string;
  persona?: string;
};

export type ValidationResult = {
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
};

/**
 * Shared validation for a review submission, used on both the client (for
 * immediate feedback) and the server (as the source of truth). Kept
 * dependency-free from React or Next.js so it can run in either place.
 */
export function validateSubmission(input: SubmissionInput): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  const text = input.text.trim();

  if (!text) {
    errors.push({
      field: "text",
      message:
        "Add some writing before requesting feedback — paste your text or upload a document.",
    });
  } else if (text.length < SUBMISSION_LIMITS.minCharacters) {
    errors.push({
      field: "text",
      message: `This looks too short to give useful feedback on. Add a bit more (at least ${SUBMISSION_LIMITS.minCharacters} characters).`,
    });
  } else if (text.length > SUBMISSION_LIMITS.maxCharacters) {
    const over = text.length - SUBMISSION_LIMITS.maxCharacters;
    errors.push({
      field: "text",
      message: `Your submission is ${over.toLocaleString()} characters over the ${SUBMISSION_LIMITS.maxCharacters.toLocaleString()} character limit. Please trim it before submitting — we won't cut it down for you.`,
    });
  } else if (text.length < SUBMISSION_LIMITS.shortWarningThreshold) {
    warnings.push({
      field: "text",
      message:
        "This is a short piece, so feedback may be more limited than it would be for a longer submission.",
    });
  }

  if (!input.writingType) {
    errors.push({
      field: "writingType",
      message: "Choose the type of writing so feedback can be tailored to it.",
    });
  } else if (!WRITING_TYPES.includes(input.writingType as (typeof WRITING_TYPES)[number])) {
    errors.push({ field: "writingType", message: "Choose a writing type from the list." });
  }

  if (!input.persona) {
    errors.push({
      field: "persona",
      message: "Choose a reader to give you feedback.",
    });
  } else if (!PERSONAS.includes(input.persona as (typeof PERSONAS)[number])) {
    errors.push({ field: "persona", message: "Choose a persona from the list." });
  }

  if (input.title && input.title.length > 200) {
    errors.push({ field: "title", message: "Titles are limited to 200 characters." });
  }

  if (input.context && input.context.length > 2000) {
    errors.push({ field: "context", message: "Context is limited to 2,000 characters." });
  }

  if (input.requestedFocus && input.requestedFocus.length > 1000) {
    errors.push({
      field: "requestedFocus",
      message: "This is limited to 1,000 characters.",
    });
  }

  return { errors, warnings };
}

export function getFileExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  return idx === -1 ? "" : filename.slice(idx).toLowerCase();
}

export function isSupportedUploadType(filename: string): boolean {
  const ext = getFileExtension(filename);
  return (SUPPORTED_UPLOAD_EXTENSIONS as readonly string[]).includes(ext);
}
