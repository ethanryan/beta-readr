import { QuickStart } from "./QuickStart";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>betaReadr</p>
          <h1 className={styles.headline}>
            Better feedback for <em>better writing</em>.
          </h1>
          <p className={styles.support}>
            Get thoughtful, workshop-style feedback on what is working, what
            is unclear, and where your writing could become stronger.
          </p>
          <p className={styles.philosophy}>
            AI feedback without AI ghostwriting.
          </p>
          <p className={styles.trust}>
            Constructive critique. Clear suggestions. Your voice stays yours.
          </p>
        </div>
        <QuickStart />
      </div>
    </section>
  );
}
