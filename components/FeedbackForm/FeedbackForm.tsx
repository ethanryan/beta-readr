"use client";

import { useMemo, useState } from "react";
import {
  WRITING_TYPE_OPTIONS,
  SUBMISSION_LIMITS,
} from "@/lib/reviewTypes";
import { validateSubmission, type ValidationIssue } from "@/lib/validation";
import { track } from "@/lib/analytics";
import type { Persona, ReviewRequest, WritingType } from "@/types/review";
import {
  SubmissionInput,
  type SubmissionValue,
} from "@/components/SubmissionInput/SubmissionInput";
import { PersonaSelector } from "@/components/PersonaSelector/PersonaSelector";
import styles from "./FeedbackForm.module.css";

export type FeedbackFormValues = {
  title: string;
  writingType: WritingType | "";
  context: string;
  requestedFocus: string;
  persona: Persona | "";
  submission: SubmissionValue;
};

export const EMPTY_FORM_VALUES: FeedbackFormValues = {
  title: "",
  writingType: "",
  context: "",
  requestedFocus: "",
  persona: "supportive-writing-coach",
  submission: { method: "paste", pastedText: "", file: null },
};

type Props = {
  initialValues: FeedbackFormValues;
  isSubmitting: boolean;
  submitError?: string | null;
  submitLabel?: string;
  onValuesChange?: (values: FeedbackFormValues) => void;
  onSubmit: (values: FeedbackFormValues, request: ReviewRequest) => void;
};

function effectiveText(submission: SubmissionValue): string {
  return submission.method === "paste"
    ? submission.pastedText
    : (submission.file?.extractedText ?? "");
}

export function FeedbackForm({
  initialValues,
  isSubmitting,
  submitError,
  submitLabel = "Get Feedback",
  onValuesChange,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<FeedbackFormValues>(initialValues);
  const [errors, setErrors] = useState<ValidationIssue[]>([]);
  const [warnings, setWarnings] = useState<ValidationIssue[]>([]);

  const text = effectiveText(values.submission);
  const charCount = text.length;
  const overLimit = charCount > SUBMISSION_LIMITS.maxCharacters;

  function updateValues(
    update: (current: FeedbackFormValues) => FeedbackFormValues,
  ) {
    const next = update(values);
    setValues(next);
    onValuesChange?.(next);
  }

  const errorByField = useMemo(() => {
    const map: Partial<Record<ValidationIssue["field"], string>> = {};
    for (const issue of errors) map[issue.field] = issue.message;
    return map;
  }, [errors]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = validateSubmission({
      title: values.title || undefined,
      writingType: values.writingType || undefined,
      text,
      context: values.context || undefined,
      requestedFocus: values.requestedFocus || undefined,
      persona: values.persona || undefined,
    });

    setErrors(result.errors);
    setWarnings(result.warnings);

    if (result.errors.length > 0) {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
      return;
    }

    track({
      name: "review_submitted",
      writingType: values.writingType,
      persona: values.persona,
      characterCount: charCount,
    });

    onSubmit(values, {
      title: values.title || undefined,
      writingType: values.writingType || undefined,
      text,
      context: values.context || undefined,
      requestedFocus: values.requestedFocus || undefined,
      persona: values.persona || "supportive-writing-coach",
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {errors.length > 0 && (
        <div className={styles.errorSummary} role="alert">
          <p className={styles.errorSummaryTitle}>
            Please take a look at the following before submitting:
          </p>
          <ul>
            {errors.map((issue) => (
              <li key={issue.field}>{issue.message}</li>
            ))}
          </ul>
        </div>
      )}

      {submitError && (
        <div className={styles.errorSummary} role="alert">
          <p className={styles.errorSummaryTitle}>{submitError}</p>
        </div>
      )}

      <div className={styles.field}>
        <SubmissionInput
          value={values.submission}
          onChange={(submission) =>
            updateValues((current) => ({ ...current, submission }))
          }
          error={errorByField.text}
        />
        <div className={styles.charCount} aria-live="polite">
          {charCount.toLocaleString()} /{" "}
          {SUBMISSION_LIMITS.maxCharacters.toLocaleString()} characters
          {overLimit ? " — over the limit" : ""}
        </div>
        {warnings
          .filter((w) => w.field === "text")
          .map((w) => (
            <p key={w.field} className={styles.warningText}>
              {w.message}
            </p>
          ))}
      </div>

      <details className={styles.additionalDetails}>
        <summary className={styles.additionalDetailsSummary}>
          Customize your feedback <span className={styles.optional}>(optional)</span>
        </summary>
        <div className={styles.additionalDetailsFields}>
          <div className={styles.field}>
            <label htmlFor="writingType" className={styles.label}>
              Type of writing <span className={styles.optional}>(optional)</span>
            </label>
            <p className={styles.helperText}>
              Leave this blank and betaReadr will make its best guess.
            </p>
            <select
              id="writingType"
              className={styles.select}
              value={values.writingType}
              aria-invalid={Boolean(errorByField.writingType)}
              aria-describedby={errorByField.writingType ? "writingType-error" : undefined}
              onChange={(e) =>
                updateValues((current) => ({
                  ...current,
                  writingType: e.target.value as WritingType,
                }))
              }
            >
              <option value="">Let betaReadr decide</option>
              {WRITING_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errorByField.writingType && (
              <p id="writingType-error" className={styles.fieldError} role="alert">
                {errorByField.writingType}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <PersonaSelector
              value={values.persona}
              onChange={(persona) =>
                updateValues((current) => ({ ...current, persona }))
              }
              error={errorByField.persona}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="requestedFocus" className={styles.label}>
              Anything you especially want feedback on?{" "}
              <span className={styles.optional}>(optional)</span>
            </label>
            <p className={styles.helperText}>
              For example: pacing, dialogue, clarity, tone, argument, the opening
              paragraph, character motivation, structure, reader engagement.
            </p>
            <textarea
              id="requestedFocus"
              className={styles.textareaSmall}
              rows={2}
              maxLength={1000}
              value={values.requestedFocus}
              onChange={(e) =>
                updateValues((current) => ({
                  ...current,
                  requestedFocus: e.target.value,
                }))
              }
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>
              Title <span className={styles.optional}>(optional)</span>
            </label>
            <input
              id="title"
              type="text"
              className={styles.input}
              value={values.title}
              maxLength={200}
              onChange={(e) =>
                updateValues((current) => ({
                  ...current,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="context" className={styles.label}>
              Context <span className={styles.optional}>(optional)</span>
            </label>
            <p className={styles.helperText}>
              Share the intended audience or where this appears in a larger work.
            </p>
            <textarea
              id="context"
              className={styles.textareaSmall}
              rows={3}
              maxLength={2000}
              value={values.context}
              onChange={(e) =>
                updateValues((current) => ({
                  ...current,
                  context: e.target.value,
                }))
              }
            />
          </div>
        </div>
      </details>

      <button type="submit" className={styles.submit} disabled={isSubmitting}>
        {isSubmitting ? "Reading your work…" : submitLabel}
      </button>
    </form>
  );
}
