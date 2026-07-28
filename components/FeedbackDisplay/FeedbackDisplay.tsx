"use client";

import { useState } from "react";
import type { ReviewFeedback } from "@/types/review";
import { track } from "@/lib/analytics";
import styles from "./FeedbackDisplay.module.css";

type Props = {
  feedback: ReviewFeedback;
  title?: string;
  onEditSubmission: () => void;
  onStartNewReview: () => void;
};

function feedbackToPlainText(feedback: ReviewFeedback, title?: string): string {
  const lines: string[] = [];
  if (title) lines.push(title, "");
  lines.push("Overall Impression", feedback.overallImpression, "");
  lines.push("What Is Working");
  for (const s of feedback.strengths) {
    lines.push(`- ${s.title}: ${s.explanation}`);
    if (s.example) lines.push(`  Example: ${s.example}`);
  }
  lines.push("");
  lines.push("What Could Be Stronger");
  for (const w of feedback.weaknesses) {
    lines.push(`- ${w.title}: ${w.explanation}`);
    if (w.example) lines.push(`  Example: ${w.example}`);
  }
  lines.push("");
  lines.push("Reader Experience", feedback.readerExperience, "");
  lines.push("Revision Priorities");
  feedback.revisionPriorities.forEach((p, i) => {
    lines.push(`${i + 1}. ${p.priority}`);
    lines.push(`   Why it matters: ${p.reason}`);
    lines.push(`   Approach: ${p.suggestedApproach}`);
  });
  lines.push("");
  lines.push("Questions to Consider");
  for (const q of feedback.questionsForWriter) lines.push(`- ${q}`);
  lines.push("");
  lines.push("Final Encouragement", feedback.encouragement);
  return lines.join("\n");
}

export function FeedbackDisplay({
  feedback,
  title,
  onEditSubmission,
  onStartNewReview,
}: Props) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(feedbackToPlainText(feedback, title));
      setCopyStatus("copied");
      track({ name: "feedback_copied" });
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => setCopyStatus("idle"), 2500);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.actionsBar}>
        <button type="button" className={styles.actionButton} onClick={onEditSubmission}>
          Edit &amp; resubmit
        </button>
        <button
          type="button"
          className={styles.actionButton}
          onClick={() => {
            track({ name: "new_review_started" });
            onStartNewReview();
          }}
        >
          Start a new review
        </button>
        <button type="button" className={styles.actionButton} onClick={handleCopy}>
          {copyStatus === "copied"
            ? "Copied!"
            : copyStatus === "failed"
              ? "Couldn't copy"
              : "Copy feedback"}
        </button>
        <button
          type="button"
          className={styles.actionButton}
          onClick={() => window.print()}
        >
          Print
        </button>
        <span className="visually-hidden" role="status" aria-live="polite">
          {copyStatus === "copied" ? "Feedback copied to clipboard" : ""}
        </span>
      </div>

      {title && <p className={styles.reviewedTitle}>Feedback on &ldquo;{title}&rdquo;</p>}

      <section className={styles.section} aria-labelledby="overall-impression">
        <h2 id="overall-impression" className={styles.sectionHeading}>
          Overall Impression
        </h2>
        <p className={styles.prose}>{feedback.overallImpression}</p>
      </section>

      <section className={`${styles.section} ${styles.strengthsSection}`} aria-labelledby="what-is-working">
        <h2 id="what-is-working" className={styles.sectionHeading}>
          What Is Working
        </h2>
        <div className={styles.itemList}>
          {feedback.strengths.map((s) => (
            <div key={s.title} className={styles.strengthItem}>
              <h3 className={styles.itemTitle}>{s.title}</h3>
              <p className={styles.prose}>{s.explanation}</p>
              {s.example && <p className={styles.example}>&ldquo;{s.example}&rdquo;</p>}
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.weaknessesSection}`} aria-labelledby="what-could-be-stronger">
        <h2 id="what-could-be-stronger" className={styles.sectionHeading}>
          What Could Be Stronger
        </h2>
        <div className={styles.itemList}>
          {feedback.weaknesses.map((w) => (
            <div key={w.title} className={styles.weaknessItem}>
              <h3 className={styles.itemTitle}>{w.title}</h3>
              <p className={styles.prose}>{w.explanation}</p>
              {w.example && <p className={styles.example}>&ldquo;{w.example}&rdquo;</p>}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="reader-experience">
        <h2 id="reader-experience" className={styles.sectionHeading}>
          Reader Experience
        </h2>
        <p className={styles.prose}>{feedback.readerExperience}</p>
      </section>

      <section className={styles.section} aria-labelledby="revision-priorities">
        <h2 id="revision-priorities" className={styles.sectionHeading}>
          Revision Priorities
        </h2>
        <ol className={styles.priorityList}>
          {feedback.revisionPriorities.map((p, i) => (
            <li key={p.priority} className={styles.priorityItem}>
              <span className={styles.priorityNumber}>{i + 1}</span>
              <div>
                <h3 className={styles.itemTitle}>{p.priority}</h3>
                <p className={styles.prose}>
                  <strong>Why it matters:</strong> {p.reason}
                </p>
                <p className={styles.prose}>
                  <strong>Approach:</strong> {p.suggestedApproach}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="questions-to-consider">
        <h2 id="questions-to-consider" className={styles.sectionHeading}>
          Questions to Consider
        </h2>
        <ul className={styles.questionList}>
          {feedback.questionsForWriter.map((q) => (
            <li key={q} className={styles.prose}>
              {q}
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.section} ${styles.encouragementSection}`} aria-labelledby="final-encouragement">
        <h2 id="final-encouragement" className={styles.sectionHeading}>
          Final Encouragement
        </h2>
        <p className={styles.encouragementText}>{feedback.encouragement}</p>
      </section>
    </div>
  );
}
