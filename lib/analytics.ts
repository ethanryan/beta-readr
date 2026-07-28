/**
 * Typed analytics abstraction. No provider is wired up yet — in production
 * this is a no-op, and in development it logs to the console so the event
 * shape can be verified. Swap the `track` implementation for a real
 * provider later without touching call sites.
 *
 * Never pass submitted writing content as an event property.
 */

export type AnalyticsEvent =
  | { name: "landing_cta_clicked" }
  | { name: "review_started" }
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
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event.name, event);
  }
  // Intentionally a no-op in production until an analytics provider is added.
}
