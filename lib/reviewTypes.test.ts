import { describe, expect, it } from "vitest";
import { PERSONA_OPTIONS, WRITING_TYPE_OPTIONS, SUBMISSION_LIMITS } from "./reviewTypes";
import { PERSONAS, WRITING_TYPES } from "@/types/review";

describe("persona configuration", () => {
  it("includes every persona defined in the shared type", () => {
    expect(PERSONA_OPTIONS).toHaveLength(PERSONAS.length);
    for (const persona of PERSONAS) {
      expect(PERSONA_OPTIONS.some((p) => p.value === persona)).toBe(true);
    }
  });

  it("gives every persona a non-empty label and description", () => {
    for (const persona of PERSONA_OPTIONS) {
      expect(persona.label.length).toBeGreaterThan(0);
      expect(persona.description.length).toBeGreaterThan(0);
    }
  });

  it("includes the five MVP personas from the product spec", () => {
    const expected = [
      "supportive-writing-coach",
      "developmental-editor",
      "careful-line-editor",
      "honest-workshop-partner",
      "target-reader",
    ];
    expect(PERSONA_OPTIONS.map((p) => p.value).sort()).toEqual(expected.sort());
  });
});

describe("writing type configuration", () => {
  it("includes every writing type defined in the shared type", () => {
    expect(WRITING_TYPE_OPTIONS).toHaveLength(WRITING_TYPES.length);
  });
});

describe("submission limits", () => {
  it("keeps the maximum above the minimum and warning threshold", () => {
    expect(SUBMISSION_LIMITS.maxCharacters).toBeGreaterThan(
      SUBMISSION_LIMITS.shortWarningThreshold,
    );
    expect(SUBMISSION_LIMITS.shortWarningThreshold).toBeGreaterThan(
      SUBMISSION_LIMITS.minCharacters,
    );
  });

  it("uses the 25,000 character MVP limit from the product spec", () => {
    expect(SUBMISSION_LIMITS.maxCharacters).toBe(25000);
  });
});
