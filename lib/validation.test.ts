import { describe, expect, it } from "vitest";
import { validateSubmission, getFileExtension, isSupportedUploadType } from "./validation";
import { SUBMISSION_LIMITS } from "./reviewTypes";

const baseInput = {
  writingType: "essay",
  persona: "supportive-writing-coach",
};

describe("validateSubmission", () => {
  it("passes for a valid, reasonably long submission", () => {
    const result = validateSubmission({
      ...baseInput,
      text: "a".repeat(500),
    });
    expect(result.errors).toHaveLength(0);
  });

  it("rejects an empty submission", () => {
    const result = validateSubmission({ ...baseInput, text: "   " });
    expect(result.errors.some((e) => e.field === "text")).toBe(true);
  });

  it("rejects submissions shorter than the minimum", () => {
    const result = validateSubmission({ ...baseInput, text: "too short" });
    expect(result.errors.some((e) => e.field === "text")).toBe(true);
  });

  it("warns, but does not error, for short-but-valid submissions", () => {
    const text = "a".repeat(SUBMISSION_LIMITS.minCharacters + 5);
    const result = validateSubmission({ ...baseInput, text });
    expect(result.errors).toHaveLength(0);
    expect(result.warnings.some((w) => w.field === "text")).toBe(true);
  });

  it("rejects submissions over the maximum character limit", () => {
    const text = "a".repeat(SUBMISSION_LIMITS.maxCharacters + 1);
    const result = validateSubmission({ ...baseInput, text });
    expect(result.errors.some((e) => e.field === "text")).toBe(true);
  });

  it("accepts a submission exactly at the maximum character limit", () => {
    const text = "a".repeat(SUBMISSION_LIMITS.maxCharacters);
    const result = validateSubmission({ ...baseInput, text });
    expect(result.errors.some((e) => e.field === "text")).toBe(false);
  });

  it("requires a writing type", () => {
    const result = validateSubmission({
      text: "a".repeat(500),
      persona: "supportive-writing-coach",
    });
    expect(result.errors.some((e) => e.field === "writingType")).toBe(true);
  });

  it("rejects an unrecognized writing type", () => {
    const result = validateSubmission({
      text: "a".repeat(500),
      persona: "supportive-writing-coach",
      writingType: "not-a-real-type",
    });
    expect(result.errors.some((e) => e.field === "writingType")).toBe(true);
  });

  it("requires a persona", () => {
    const result = validateSubmission({
      text: "a".repeat(500),
      writingType: "essay",
    });
    expect(result.errors.some((e) => e.field === "persona")).toBe(true);
  });

  it("rejects an unrecognized persona", () => {
    const result = validateSubmission({
      text: "a".repeat(500),
      writingType: "essay",
      persona: "not-a-real-persona",
    });
    expect(result.errors.some((e) => e.field === "persona")).toBe(true);
  });
});

describe("file upload helpers", () => {
  it("extracts a lowercase file extension", () => {
    expect(getFileExtension("My Essay.DOCX")).toBe(".docx");
    expect(getFileExtension("notes.md")).toBe(".md");
    expect(getFileExtension("no-extension")).toBe("");
  });

  it("accepts supported upload types", () => {
    expect(isSupportedUploadType("draft.txt")).toBe(true);
    expect(isSupportedUploadType("draft.md")).toBe(true);
    expect(isSupportedUploadType("draft.docx")).toBe(true);
  });

  it("rejects unsupported upload types", () => {
    expect(isSupportedUploadType("draft.pdf")).toBe(false);
    expect(isSupportedUploadType("draft.exe")).toBe(false);
  });
});
