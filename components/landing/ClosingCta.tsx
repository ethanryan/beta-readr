import Link from "next/link";
import styles from "./ClosingCta.module.css";

export function ClosingCta() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Ready for a second pair of eyes?</h2>
        <p className={styles.body}>
          Bring a piece you&apos;re working on. Leave with a clearer sense of
          what&apos;s working and what to try next.
        </p>
        <Link href="/review" className={styles.cta}>
          Get Feedback
        </Link>
      </div>
    </section>
  );
}
