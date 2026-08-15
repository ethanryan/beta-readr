import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={`${styles.header} no-print`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          betaReadr
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/#examples" className={styles.navLink}>
            Examples
          </Link>
          <Link href="/#how-it-works" className={styles.navLink}>
            How it works
          </Link>
          <Link href="/#faq" className={styles.navLink}>
            FAQ
          </Link>
          <Link href="/review" className={styles.cta}>
            Get Feedback
          </Link>
        </nav>
      </div>
    </header>
  );
}
