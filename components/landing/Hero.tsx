import { QuickStart } from "./QuickStart";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>betaReadr</p>
          <h1 className={styles.headline}>Better feedback for better writing.</h1>
          <p className={styles.support}>
            Thoughtful, workshop-style feedback to help you strengthen your
            writing without rewriting it for you.
          </p>
          <p className={styles.philosophy}>
            AI feedback without AI ghostwriting.
          </p>
        </div>
        <QuickStart />
      </div>
    </section>
  );
}
