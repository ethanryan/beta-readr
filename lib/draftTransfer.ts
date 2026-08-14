import type { SubmissionValue } from "@/components/SubmissionInput/SubmissionInput";

export const HOMEPAGE_DRAFT_KEY = "beta-readr-homepage-draft";

export function readHomepageDraft(): SubmissionValue | null {
  const storedDraft = sessionStorage.getItem(HOMEPAGE_DRAFT_KEY);
  if (!storedDraft) return null;

  sessionStorage.removeItem(HOMEPAGE_DRAFT_KEY);

  try {
    const draft = JSON.parse(storedDraft) as SubmissionValue;
    if (draft.method !== "paste" && draft.method !== "upload") return null;
    return draft;
  } catch {
    return null;
  }
}
