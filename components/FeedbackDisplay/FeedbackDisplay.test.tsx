import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeedbackDisplay } from "./FeedbackDisplay";
import type { ReviewFeedback } from "@/types/review";

const feedback: ReviewFeedback = {
  overallImpression: "A confident, atmospheric opening.",
  strengths: [
    {
      title: "Vivid concrete imagery",
      explanation: "The lighthouse detail gives the reader something to see immediately.",
      example: "climbed it every evening",
    },
  ],
  weaknesses: [
    {
      title: "Unclear pronoun reference",
      explanation: "It's momentarily unclear who 'she' refers to in the second paragraph.",
      example: null,
    },
  ],
  readerExperience: "A reader stays oriented and curious through the opening.",
  revisionPriorities: [
    {
      priority: "Clarify the pronoun reference",
      reason: "Reader confusion this early risks losing momentum.",
      suggestedApproach: "Consider naming the character before using 'she'.",
    },
  ],
  questionsForWriter: ["What does Mara want by the end of this scene?"],
  encouragement: "This has a distinct, confident voice — keep going.",
};

describe("FeedbackDisplay", () => {
  it("renders every required section", () => {
    render(
      <FeedbackDisplay
        feedback={feedback}
        onEditSubmission={vi.fn()}
        onStartNewReview={vi.fn()}
      />,
    );

    expect(screen.getByRole("heading", { name: "Overall Impression" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What Is Working" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What Could Be Stronger" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Reader Experience" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Revision Priorities" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Questions to Consider" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Final Encouragement" })).toBeInTheDocument();
  });

  it("renders both a strength and a weakness with their explanations", () => {
    render(
      <FeedbackDisplay
        feedback={feedback}
        onEditSubmission={vi.fn()}
        onStartNewReview={vi.fn()}
      />,
    );

    expect(screen.getByText("Vivid concrete imagery")).toBeInTheDocument();
    expect(screen.getByText(/lighthouse detail gives the reader/)).toBeInTheDocument();
    expect(screen.getByText("Unclear pronoun reference")).toBeInTheDocument();
    expect(screen.getByText(/momentarily unclear who 'she'/)).toBeInTheDocument();
  });

  it("shows the submitted title when provided", () => {
    render(
      <FeedbackDisplay
        feedback={feedback}
        title="Lighthouse"
        onEditSubmission={vi.fn()}
        onStartNewReview={vi.fn()}
      />,
    );
    expect(screen.getByText(/Lighthouse/)).toBeInTheDocument();
  });

  it("exposes action buttons for editing, starting over, copying, and printing", () => {
    render(
      <FeedbackDisplay
        feedback={feedback}
        onEditSubmission={vi.fn()}
        onStartNewReview={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /new review/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /print/i })).toBeInTheDocument();
  });
});
