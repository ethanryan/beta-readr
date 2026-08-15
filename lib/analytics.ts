import posthog from "posthog-js";

/**
 * Typed analytics abstraction backed by PostHog.
 *
 * Never pass submitted writing content as an event property.
 */
export type AnalyticsEvent =
  | { name: "landing_cta_clicked" }
  | { name: "review_started" }
  | { name: "example_selected"; example: string }
  | { name: "example_review_started"; example: string }
  | { name: "input_method_selected"; method: "paste" | "upload" }
  | { name: "file_uploaded"; fileType: string }
  | { name: "file_upload_failed"; reason: string }
  | {
      name: "review_submitted";
      writingType: string;
      persona: string;
      characterCount: number;
    }
  | { name: "review_completed" }
  | { name: "review_failed"; reason: string }
  | { name: "feedback_copied" }
  | { name: "new_review_started" };

export function track(event: AnalyticsEvent): void {
  const { name, ...properties } = event;

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", name, properties);
  }

  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(name, properties);
  }
}
