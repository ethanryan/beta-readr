"use client";

import { useState } from "react";
import {
  FeedbackForm,
  EMPTY_FORM_VALUES,
  type FeedbackFormValues,
} from "@/components/FeedbackForm/FeedbackForm";
import { LoadingState } from "@/components/LoadingState/LoadingState";
import { FeedbackDisplay } from "@/components/FeedbackDisplay/FeedbackDisplay";
import { track } from "@/lib/analytics";
import type { ReviewApiResponse, ReviewFeedback, ReviewRequest } from "@/types/review";
import styles from "./ReviewWorkspace.module.css";

type View = "form" | "loading" | "result" | "error";

export function ReviewWorkspace() {
  const [view, setView] = useState<View>("form");
  const [formValues, setFormValues] = useState<FeedbackFormValues>(EMPTY_FORM_VALUES);
  const [lastRequest, setLastRequest] = useState<ReviewRequest | null>(null);
  const [feedback, setFeedback] = useState<ReviewFeedback | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function submitRequest(request: ReviewRequest) {
    setView("loading");
    setErrorMessage(null);
    setLastRequest(request);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const data = (await res.json()) as ReviewApiResponse;

      if (!data.ok) {
        setErrorMessage(data.error);
        setView("error");
        track({ name: "review_failed", reason: data.error });
        return;
      }

      setFeedback(data.feedback);
      setView("result");
      track({ name: "review_completed" });
    } catch {
      setErrorMessage(
        "We couldn't reach betaReadr. Please check your connection and try again.",
      );
      setView("error");
      track({ name: "review_failed", reason: "network-error" });
    }
  }

  function handleFormSubmit(values: FeedbackFormValues, request: ReviewRequest) {
    setFormValues(values);
    submitRequest(request);
  }

  function handleRetry() {
    if (lastRequest) submitRequest(lastRequest);
  }

  function handleEditSubmission() {
    setView("form");
  }

  function handleStartNewReview() {
    setFormValues(EMPTY_FORM_VALUES);
    setFeedback(null);
    setLastRequest(null);
    setView("form");
  }

  return (
    <div className={styles.wrapper}>
      {view === "form" && (
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>Share your writing</h1>
          <p className={styles.subheading}>
            Paste your text or upload a document, tell us a bit about it, and
            choose the kind of reader you&apos;d like feedback from.
          </p>
          <FeedbackForm
            initialValues={formValues}
            isSubmitting={false}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}

      {view === "loading" && <LoadingState />}

      {view === "error" && (
        <div className={styles.errorContainer} role="alert">
          <h1 className={styles.heading}>Something went wrong</h1>
          <p className={styles.errorMessage}>{errorMessage}</p>
          <div className={styles.errorActions}>
            <button type="button" className={styles.retryButton} onClick={handleRetry}>
              Try again
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleEditSubmission}
            >
              Back to your submission
            </button>
          </div>
        </div>
      )}

      {view === "result" && feedback && (
        <FeedbackDisplay
          feedback={feedback}
          title={formValues.title || undefined}
          onEditSubmission={handleEditSubmission}
          onStartNewReview={handleStartNewReview}
        />
      )}
    </div>
  );
}
