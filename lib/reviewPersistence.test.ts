import { beforeEach, describe, expect, it } from "vitest";
import { EMPTY_FORM_VALUES } from "@/components/FeedbackForm/FeedbackForm";
import type { ReviewFeedback } from "@/types/review";
import {
  REVIEW_STORAGE_KEY,
  clearSavedReview,
  readSavedReview,
  requestFromFormValues,
  requestsMatch,
  saveReview,
} from "./reviewPersistence";

const feedback: ReviewFeedback = {
  overallImpression: "A clear opening.",
  strengths: [{ title: "Voice", explanation: "Distinct.", example: null }],
  weaknesses: [{ title: "Pacing", explanation: "Slow here.", example: null }],
  readerExperience: "Engaged.",
  revisionPriorities: [
    { priority: "Opening", reason: "Sets expectations.", suggestedApproach: "Revisit it." },
  ],
  questionsForWriter: ["What changes next?"],
  encouragement: "Keep going.",
};

describe("review persistence", () => {
  beforeEach(() => localStorage.clear());

  it("restores form inputs and generated feedback", () => {
    const formValues = {
      ...EMPTY_FORM_VALUES,
      writingType: "essay" as const,
      submission: { method: "paste" as const, pastedText: "My draft", file: null },
    };
    const lastRequest = requestFromFormValues(formValues);

    saveReview({ formValues, lastRequest, feedback });

    expect(readSavedReview()).toEqual({ formValues, lastRequest, feedback });
  });

  it("detects when an input no longer matches the reviewed version", () => {
    const reviewed = {
      ...EMPTY_FORM_VALUES,
      writingType: "essay" as const,
      submission: { method: "paste" as const, pastedText: "My draft", file: null },
    };
    const edited = { ...reviewed, writingType: "poetry" as const };

    expect(
      requestsMatch(requestFromFormValues(reviewed), requestFromFormValues(reviewed)),
    ).toBe(true);
    expect(
      requestsMatch(requestFromFormValues(edited), requestFromFormValues(reviewed)),
    ).toBe(false);
  });

  it("ignores malformed saved data", () => {
    localStorage.setItem(REVIEW_STORAGE_KEY, "not json");
    expect(readSavedReview()).toBeNull();
  });

  it("clears the saved workspace", () => {
    localStorage.setItem(REVIEW_STORAGE_KEY, "saved");
    clearSavedReview();
    expect(localStorage.getItem(REVIEW_STORAGE_KEY)).toBeNull();
  });
});
