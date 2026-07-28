"use client";

import { useId, useRef, useState } from "react";
import {
  getFileExtension,
  isSupportedUploadType,
} from "@/lib/validation";
import { SUPPORTED_UPLOAD_EXTENSIONS } from "@/lib/reviewTypes";
import { track } from "@/lib/analytics";
import styles from "./SubmissionInput.module.css";

export type InputMethod = "paste" | "upload";

export type UploadedFile = {
  name: string;
  extension: string;
  extractedText: string;
};

export type SubmissionValue = {
  method: InputMethod;
  pastedText: string;
  file: UploadedFile | null;
};

type Props = {
  value: SubmissionValue;
  onChange: (value: SubmissionValue) => void;
  error?: string;
};

/**
 * Paste and upload both keep their own content in state so switching
 * methods never silently discards what the writer already entered — only
 * the active method's text is used on submit.
 */
export function SubmissionInput({ value, onChange, error }: Props) {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pasteId = useId();
  const uploadId = useId();

  function setMethod(method: InputMethod) {
    track({ name: "input_method_selected", method });
    onChange({ ...value, method });
  }

  async function handleFileSelected(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;

    setUploadError(null);

    if (!isSupportedUploadType(file.name)) {
      const message = `"${getFileExtension(file.name) || file.name}" isn't a supported file type. Please upload a ${SUPPORTED_UPLOAD_EXTENSIONS.join(", ")} file.`;
      setUploadError(message);
      track({ name: "file_upload_failed", reason: "unsupported-type" });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsExtracting(true);
    try {
      const extension = getFileExtension(file.name);
      const extractedText =
        extension === ".docx"
          ? await extractDocxText(file)
          : await file.text();

      if (!extractedText.trim()) {
        setUploadError(
          "We couldn't find any text in that file. Please check the document or paste your text instead.",
        );
        track({ name: "file_upload_failed", reason: "empty-extraction" });
        return;
      }

      onChange({
        ...value,
        method: "upload",
        file: { name: file.name, extension, extractedText },
      });
      track({ name: "file_uploaded", fileType: extension });
    } catch {
      setUploadError(
        "We couldn't read that file. It may be corrupted or in an unexpected format — please try again or paste your text instead.",
      );
      track({ name: "file_upload_failed", reason: "extraction-error" });
    } finally {
      setIsExtracting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeFile() {
    onChange({ ...value, file: null });
    setUploadError(null);
  }

  return (
    <div className={styles.wrapper}>
      <fieldset className={styles.methodFieldset}>
        <legend className={styles.legend}>
          How would you like to share your writing?
        </legend>
        <div className={styles.methodOptions}>
          <label className={styles.methodOption} data-active={value.method === "paste"}>
            <input
              type="radio"
              name="input-method"
              value="paste"
              checked={value.method === "paste"}
              onChange={() => setMethod("paste")}
            />
            Paste text
          </label>
          <label className={styles.methodOption} data-active={value.method === "upload"}>
            <input
              type="radio"
              name="input-method"
              value="upload"
              checked={value.method === "upload"}
              onChange={() => setMethod("upload")}
            />
            Upload a document
          </label>
        </div>
      </fieldset>

      {value.method === "paste" ? (
        <div>
          <label htmlFor={pasteId} className={styles.fieldLabel}>
            Your writing
          </label>
          <textarea
            id={pasteId}
            className={styles.textarea}
            value={value.pastedText}
            onChange={(e) => onChange({ ...value, pastedText: e.target.value })}
            placeholder="Paste your writing here…"
            rows={16}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${pasteId}-error` : undefined}
          />
        </div>
      ) : (
        <div>
          <label htmlFor={uploadId} className={styles.fieldLabel}>
            Upload a document
          </label>
          {!value.file ? (
            <>
              <input
                ref={fileInputRef}
                id={uploadId}
                type="file"
                accept={SUPPORTED_UPLOAD_EXTENSIONS.join(",")}
                className={styles.fileInput}
                onChange={(e) => handleFileSelected(e.target.files)}
                aria-describedby={uploadError ? `${uploadId}-error` : undefined}
              />
              <p className={styles.helperText}>
                Supported formats: {SUPPORTED_UPLOAD_EXTENSIONS.join(", ")}
              </p>
              {isExtracting && (
                <p role="status" className={styles.helperText}>
                  Reading your document…
                </p>
              )}
            </>
          ) : (
            <div className={styles.filePreview}>
              <div className={styles.fileInfo}>
                <p className={styles.fileName}>{value.file.name}</p>
                <p className={styles.fileMeta}>
                  {value.file.extension.replace(".", "").toUpperCase()} ·{" "}
                  {value.file.extractedText.length.toLocaleString()} characters
                  extracted
                </p>
              </div>
              <button
                type="button"
                className={styles.removeButton}
                onClick={removeFile}
              >
                Remove file
              </button>
            </div>
          )}
          {uploadError && (
            <p id={`${uploadId}-error`} className={styles.errorText} role="alert">
              {uploadError}
            </p>
          )}
        </div>
      )}

      {error && (
        <p id={`${pasteId}-error`} className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

async function extractDocxText(file: File): Promise<string> {
  const mammoth = (await import("mammoth/mammoth.browser")).default;
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}
