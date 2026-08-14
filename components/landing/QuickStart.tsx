"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SubmissionInput,
  type SubmissionValue,
} from "@/components/SubmissionInput/SubmissionInput";
import { track } from "@/lib/analytics";
import { HOMEPAGE_DRAFT_KEY } from "@/lib/draftTransfer";
import styles from "./QuickStart.module.css";

const EMPTY_SUBMISSION: SubmissionValue = {
  method: "paste",
  pastedText: "",
  file: null,
};

function submissionText(submission: SubmissionValue): string {
  return submission.method === "paste"
    ? submission.pastedText
    : (submission.file?.extractedText ?? "");
}

export function QuickStart() {
  const router = useRouter();
  const [submission, setSubmission] = useState(EMPTY_SUBMISSION);
  const [error, setError] = useState<string>();

  function handleContinue() {
    if (!submissionText(submission).trim()) {
      setError("Paste your writing or upload a document to continue.");
      return;
    }

    sessionStorage.setItem(HOMEPAGE_DRAFT_KEY, JSON.stringify(submission));
    track({ name: "review_started" });
    router.push("/review");
  }

  return (
    <div className={styles.wrapper}>
      <SubmissionInput
        value={submission}
        onChange={(nextSubmission) => {
          setSubmission(nextSubmission);
          setError(undefined);
        }}
        error={error}
        compact
      />
      <div className={styles.actions}>
        <button type="button" className={styles.continueButton} onClick={handleContinue}>
          Continue
        </button>
        <p className={styles.reassurance}>
          Add a few details next, then choose your feedback style.
        </p>
      </div>
    </div>
  );
}
