"use client";

import { useEffect, useState } from "react";
import {
  FeedbackForm,
  EMPTY_FORM_VALUES,
  type FeedbackFormValues,
} from "@/components/FeedbackForm/FeedbackForm";
import { LoadingState } from "@/components/LoadingState/LoadingState";
import { FeedbackDisplay } from "@/components/FeedbackDisplay/FeedbackDisplay";
import { track } from "@/lib/analytics";
import { readHomepageDraft } from "@/lib/draftTransfer";
import {
  clearSavedReview,
  readSavedReview,
  requestFromFormValues,
  requestsMatch,
  saveReview,
} from "@/lib/reviewPersistence";
import type { ReviewApiResponse, ReviewFeedback, ReviewRequest } from "@/types/review";
import styles from "./ReviewWorkspace.module.css";

type View = "form" | "loading" | "result" | "error";

export function ReviewWorkspace() {
  const [view, setView] = useState<View>("form");
  const [formValues, setFormValues] = useState<FeedbackFormValues>(EMPTY_FORM_VALUES);
  const [lastRequest, setLastRequest] = useState<ReviewRequest | null>(null);
  const [pendingRequest, setPendingRequest] = useState<ReviewRequest | null>(null);
  const [feedback, setFeedback] = useState<ReviewFeedback | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const homepageDraft = readHomepageDraft();
      if (homepageDraft) {
        setFormValues({ ...EMPTY_FORM_VALUES, submission: homepageDraft });
        setFeedback(null);
        setLastRequest(null);
        setView("form");
        clearSavedReview();
      } else {
        const saved = readSavedReview();
        if (saved) {
          setFormValues(saved.formValues);
          setLastRequest(saved.lastRequest);
          setFeedback(saved.feedback);
          setView(saved.feedback ? "result" : "form");
          setIsEditing(
            Boolean(
              saved.feedback &&
                !requestsMatch(
                  requestFromFormValues(saved.formValues),
                  saved.lastRequest,
                ),
            ),
          );
        }
      }
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    if (!isReady) return;
    saveReview({ formValues, lastRequest, feedback });
  }, [feedback, formValues, isReady, lastRequest]);

  const feedbackIsOutdated = Boolean(
    feedback &&
      !requestsMatch(requestFromFormValues(formValues), lastRequest),
  );

  async function submitRequest(request: ReviewRequest) {
    setView("loading");
    setErrorMessage(null);
    setPendingRequest(request);

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
      setLastRequest(request);
      setPendingRequest(null);
      setView("result");
      setIsEditing(false);
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
    if (pendingRequest) submitRequest(pendingRequest);
  }

  function handleEditSubmission() {
    setIsEditing(true);
    setView(feedback ? "result" : "form");
    queueMicrotask(() => {
      document.getElementById("review-form")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  }

  function handleStartNewReview() {
    setFormValues(EMPTY_FORM_VALUES);
    setFeedback(null);
    setLastRequest(null);
    setPendingRequest(null);
    setIsEditing(false);
    clearSavedReview();
    setView("form");
  }

  return (
    <div className={styles.wrapper}>
      {view === "form" && isReady && (
        <div id="review-form" className={styles.formContainer}>
          <h1 className={styles.heading}>Share your writing</h1>
          <p className={styles.subheading}>
            Paste your text or upload a document, tell us a bit about it, and
            choose the kind of reader you&apos;d like feedback from.
          </p>
          <FeedbackForm
            initialValues={formValues}
            isSubmitting={false}
            onValuesChange={setFormValues}
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

      {view === "result" && feedback && isReady && (
        <>
          {isEditing && (
            <div id="review-form" className={styles.formContainer}>
              <h1 className={styles.heading}>Edit your writing</h1>
              <p className={styles.subheading}>
                Make any changes you like, then request updated feedback. Your
                existing feedback remains below while you edit.
              </p>
              <FeedbackForm
                initialValues={formValues}
                isSubmitting={false}
                submitLabel="Get Updated Feedback"
                onValuesChange={setFormValues}
                onSubmit={handleFormSubmit}
              />
              {feedbackIsOutdated && (
                <p className={styles.outdatedNotice} role="status">
                  This feedback is based on an earlier version. Get updated
                  feedback when you are ready.
                </p>
              )}
            </div>
          )}
          <FeedbackDisplay
            feedback={feedback}
            title={lastRequest?.title || undefined}
            onEditSubmission={handleEditSubmission}
            onStartNewReview={handleStartNewReview}
          />
        </>
      )}
    </div>
  );
}
