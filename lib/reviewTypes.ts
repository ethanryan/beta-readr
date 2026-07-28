import {
  PERSONA_INFO,
  PERSONAS,
  WRITING_TYPE_LABELS,
  WRITING_TYPES,
  type Persona,
  type WritingType,
} from "@/types/review";

/** The single place that defines submission length limits for the MVP. */
export const SUBMISSION_LIMITS = {
  /** Below this, we block submission outright — there isn't enough text to review. */
  minCharacters: 50,
  /** Below this, we still allow submission but warn that feedback may be limited. */
  shortWarningThreshold: 300,
  /** Hard ceiling for the MVP. Longer manuscript support may come later. */
  maxCharacters: 25000,
} as const;

export const SUPPORTED_UPLOAD_EXTENSIONS = [".txt", ".md", ".docx"] as const;

export const WRITING_TYPE_OPTIONS: Array<{
  value: WritingType;
  label: string;
}> = WRITING_TYPES.map((value) => ({
  value,
  label: WRITING_TYPE_LABELS[value],
}));

export const PERSONA_OPTIONS: Array<{
  value: Persona;
  label: string;
  description: string;
}> = PERSONAS.map((value) => ({
  value,
  label: PERSONA_INFO[value].label,
  description: PERSONA_INFO[value].description,
}));

export {
  PERSONA_INFO,
  PERSONAS,
  WRITING_TYPE_LABELS,
  WRITING_TYPES,
  type Persona,
  type WritingType,
};
