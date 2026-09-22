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
            Your virtual writing workshop: thoughtful readers with distinct
            perspectives helping you see what works, what does not, and where
            your writing could grow.
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
