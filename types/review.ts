import { z } from "zod";

/**
 * Writing types a user can submit for review.
 * Kept as a const tuple so it can drive both the Zod schema and UI options.
 */
export const WRITING_TYPES = [
  "fiction",
  "novel-chapter",
  "short-story",
  "memoir",
  "essay",
  "poetry",
  "article-or-blog-post",
  "professional-writing",
  "social-media-post",
  "other",
] as const;

export type WritingType = (typeof WRITING_TYPES)[number];

export const WRITING_TYPE_LABELS: Record<WritingType, string> = {
  fiction: "Fiction",
  "novel-chapter": "Novel chapter",
  "short-story": "Short story",
  memoir: "Memoir",
  essay: "Essay",
  poetry: "Poetry",
  "article-or-blog-post": "Article or blog post",
  "professional-writing": "Professional writing",
  "social-media-post": "Social media post",
  other: "Other",
};

/**
 * Feedback personas. The MVP lets a writer pick exactly one, but the schema
 * treats a submission and its persona as separate entities so a future
 * version can request several reviews of the same piece.
 */
export const PERSONAS = [
  "supportive-writing-coach",
  "developmental-editor",
  "careful-line-editor",
  "honest-workshop-partner",
  "target-reader",
] as const;

export type Persona = (typeof PERSONAS)[number];

export const PERSONA_INFO: Record<
  Persona,
  { label: string; description: string }
> = {
  "supportive-writing-coach": {
    label: "Supportive Writing Coach",
    description:
      "Encouraging, constructive, and focused on helping you build confidence while improving the piece.",
  },
  "developmental-editor": {
    label: "Developmental Editor",
    description:
      "Focused on structure, pacing, organization, themes, character development, argument, and high-level revision opportunities.",
  },
  "careful-line-editor": {
    label: "Careful Line Editor",
    description:
      "Focused on clarity, rhythm, repetition, awkward phrasing, sentence flow, and consistency without rewriting your work.",
  },
  "honest-workshop-partner": {
    label: "Honest Workshop Partner",
    description:
      "Direct and candid but respectful. Identifies what a thoughtful peer reader might question or challenge.",
  },
  "target-reader": {
    label: "Target Reader",
    description:
      "Responds primarily as an engaged member of your intended audience, noting where interest rises, falls, or becomes confused.",
  },
};

/** Request body sent from the review form to POST /api/review */
export const ReviewRequestSchema = z.object({
  title: z.string().trim().max(200).optional(),
  writingType: z.enum(WRITING_TYPES),
  text: z.string(),
  context: z.string().trim().max(2000).optional(),
  requestedFocus: z.string().trim().max(1000).optional(),
  persona: z.enum(PERSONAS),
});

export type ReviewRequest = z.infer<typeof ReviewRequestSchema>;

/** Structured feedback returned by the AI reviewer. */
export const ReviewFeedbackSchema = z.object({
  overallImpression: z
    .string()
    .describe(
      "A short, specific paragraph capturing the overall impression of the piece.",
    ),
  strengths: z
    .array(
      z.object({
        title: z.string().describe("A short label for the strength."),
        explanation: z
          .string()
          .describe("Why this works, referencing the text where useful."),
        example: z
          .string()
          .nullable()
          .describe(
            "A brief excerpt or paraphrase from the submission illustrating the strength, if useful. Null if not needed.",
          ),
      }),
    )
    .min(1),
  weaknesses: z
    .array(
      z.object({
        title: z.string().describe("A short label for the weakness."),
        explanation: z
          .string()
          .describe(
            "Why this is an opportunity for revision, framed constructively.",
          ),
        example: z
          .string()
          .nullable()
          .describe(
            "A brief excerpt or paraphrase illustrating the issue, if useful. Null if not needed.",
          ),
      }),
    )
    .min(1),
  readerExperience: z
    .string()
    .describe(
      "A description of how a reader is likely to experience the piece moment to moment.",
    ),
  revisionPriorities: z
    .array(
      z.object({
        priority: z
          .string()
          .describe("What to examine or revise, ordered by importance."),
        reason: z.string().describe("Why this matters most."),
        suggestedApproach: z
          .string()
          .describe(
            "How the writer might approach revising this, without rewriting it for them.",
          ),
      }),
    )
    .min(1)
    .max(5),
  questionsForWriter: z.array(z.string()).min(1),
  encouragement: z
    .string()
    .describe("A brief, genuine, encouraging closing note."),
});

export type ReviewFeedback = z.infer<typeof ReviewFeedbackSchema>;

export type ReviewApiResponse =
  | { ok: true; feedback: ReviewFeedback }
  | { ok: false; error: string };
