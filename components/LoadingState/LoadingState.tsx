"use client";

import { useEffect, useState } from "react";
import styles from "./LoadingState.module.css";

const MESSAGES = [
  "Reading your work carefully…",
  "Looking for what is already working…",
  "Considering the reader's experience…",
  "Identifying the highest-impact revisions…",
  "Preparing your workshop notes…",
];

const MESSAGE_INTERVAL_MS = 3200;

export function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, MESSAGE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.mark} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <p key={index} className={styles.message}>
        {MESSAGES[index]}
      </p>
      <p className={styles.note}>
        This usually takes under a minute. Thank you for your patience while
        your work gets a careful read.
      </p>
    </div>
  );
}
