import { describe, expect, it } from "vitest";
import { ReviewFeedbackSchema } from "./review";

function validFeedback() {
  return {
    overallImpression: "A confident opening with a clear central tension.",
    strengths: [
      {
        title: "Strong opening image",
        explanation: "The lighthouse detail grounds the reader immediately.",
        example: "climbed it every evening",
      },
    ],
    weaknesses: [
      {
        title: "Pacing dips in the middle",
        explanation: "The middle section slows down and loses momentum.",
        example: null,
      },
    ],
    readerExperience: "A reader stays curious through the opening.",
    revisionPriorities: [
      {
        priority: "Tighten the middle section",
        reason: "It currently loses the momentum built by the opening.",
        suggestedApproach: "Look for paragraphs that repeat the same beat.",
      },
    ],
    questionsForWriter: ["What does Mara want by the end of this scene?"],
    encouragement: "This piece has a real, distinct voice — keep going.",
  };
}

describe("ReviewFeedbackSchema", () => {
  it("accepts a well-formed review", () => {
    const result = ReviewFeedbackSchema.safeParse(validFeedback());
    expect(result.success).toBe(true);
  });

  it("requires at least one strength", () => {
    const feedback = validFeedback();
    feedback.strengths = [];
    const result = ReviewFeedbackSchema.safeParse(feedback);
    expect(result.success).toBe(false);
  });

  it("requires at least one weakness", () => {
    const feedback = validFeedback();
    feedback.weaknesses = [];
    const result = ReviewFeedbackSchema.safeParse(feedback);
    expect(result.success).toBe(false);
  });

  it("requires at least one revision priority", () => {
    const feedback = validFeedback();
    feedback.revisionPriorities = [];
    const result = ReviewFeedbackSchema.safeParse(feedback);
    expect(result.success).toBe(false);
  });

  it("requires at least one question for the writer", () => {
    const feedback = validFeedback();
    feedback.questionsForWriter = [];
    const result = ReviewFeedbackSchema.safeParse(feedback);
    expect(result.success).toBe(false);
  });

  it("rejects a response missing required fields entirely", () => {
    const result = ReviewFeedbackSchema.safeParse({ overallImpression: "Only this." });
    expect(result.success).toBe(false);
  });
});
