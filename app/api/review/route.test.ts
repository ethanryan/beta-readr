import { describe, expect, it, vi, beforeEach } from "vitest";
import { ReviewGenerationError } from "@/lib/openai";

const { generateReview } = vi.hoisted(() => ({
  generateReview: vi.fn(),
}));

vi.mock("@/lib/openai", async () => {
  const actual = await vi.importActual<typeof import("@/lib/openai")>("@/lib/openai");
  return { ...actual, generateReview };
});

import { POST } from "./route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validBody = {
  title: "Lighthouse",
  writingType: "short-story",
  text: "a".repeat(500),
  persona: "supportive-writing-coach",
};

const sampleFeedback = {
  overallImpression: "A confident opening.",
  strengths: [{ title: "Voice", explanation: "Distinct and consistent.", example: null }],
  weaknesses: [{ title: "Pacing", explanation: "Middle section drags.", example: null }],
  readerExperience: "Curious throughout.",
  revisionPriorities: [
    { priority: "Tighten middle", reason: "Loses momentum.", suggestedApproach: "Cut repetition." },
  ],
  questionsForWriter: ["What does the protagonist want?"],
  encouragement: "Keep going.",
};

beforeEach(() => {
  generateReview.mockReset();
});

describe("POST /api/review", () => {
  it("returns 400 for invalid JSON", async () => {
    const req = new Request("http://localhost/api/review", {
      method: "POST",
      body: "{not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when the writing is empty", async () => {
    const res = await POST(makeRequest({ ...validBody, text: "" }));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
  });

  it("returns 400 when the submission is over the character limit", async () => {
    const res = await POST(makeRequest({ ...validBody, text: "a".repeat(25001) }));
    expect(res.status).toBe(400);
  });

  it("infers the writing type when it is missing", async () => {
    generateReview.mockResolvedValueOnce(sampleFeedback);
    const rest: Record<string, unknown> = { ...validBody };
    delete rest.writingType;
    const res = await POST(makeRequest(rest));
    expect(res.status).toBe(200);
    expect(generateReview).toHaveBeenCalledWith(
      expect.objectContaining({ writingType: undefined }),
    );
  });

  it("uses the supportive feedback style when persona is missing", async () => {
    generateReview.mockResolvedValueOnce(sampleFeedback);
    const rest: Record<string, unknown> = { ...validBody };
    delete rest.persona;
    const res = await POST(makeRequest(rest));
    expect(res.status).toBe(200);
    expect(generateReview).toHaveBeenCalledWith(
      expect.objectContaining({ persona: "supportive-writing-coach" }),
    );
  });

  it("returns 200 with feedback on success", async () => {
    generateReview.mockResolvedValueOnce(sampleFeedback);
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.feedback.strengths.length).toBeGreaterThan(0);
    expect(json.feedback.weaknesses.length).toBeGreaterThan(0);
  });

  it("maps a rate-limit error to a 429 with a safe message", async () => {
    generateReview.mockRejectedValueOnce(
      new ReviewGenerationError("Please wait a moment and try again.", "rate-limited"),
    );
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.error).not.toMatch(/openai|api key|stack/i);
  });

  it("maps a missing API key error to a 500 without leaking details", async () => {
    generateReview.mockRejectedValueOnce(
      new ReviewGenerationError("betaReadr isn't configured to generate feedback yet.", "missing-api-key"),
    );
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
  });

  it("maps an unexpected thrown error to a safe 500 response", async () => {
    generateReview.mockRejectedValueOnce(new Error("some internal stack trace detail"));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).not.toMatch(/stack trace/i);
  });
});
