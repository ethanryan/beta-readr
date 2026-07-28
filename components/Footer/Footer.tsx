import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`${styles.footer} no-print`}>
      <div className={styles.inner}>
        <div>
          <p className={styles.wordmark}>betaReadr</p>
          <p className={styles.tagline}>AI feedback without AI ghostwriting.</p>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/privacy" className={styles.link}>
            Privacy
          </Link>
          <Link href="/terms" className={styles.link}>
            Terms
          </Link>
          <a href="mailto:hello@betareadr.app" className={styles.link}>
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
