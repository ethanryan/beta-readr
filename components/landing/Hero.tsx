import Link from "next/link";
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
          <div className={styles.actions}>
            <Link href="/review" className={styles.cta}>
              Get Feedback
            </Link>
            <p className={styles.trust}>
              Constructive critique. Clear suggestions. Your voice stays
              yours.
            </p>
          </div>
        </div>

        <div className={styles.manuscript} aria-hidden="true">
          <p className={styles.manuscriptCaption}>Sample margin notes</p>
          <div className={styles.page}>
            <p className={styles.pageText}>
              The lighthouse hadn&apos;t worked in a decade, but Mara still
              climbed it every evening, out of habit more than hope.
              <span className={styles.markStrength}>1</span> She told
              herself she was checking the bulbs. She was checking the
              horizon.
              <span className={styles.markWeakness}>2</span>
            </p>
            <div className={styles.noteStrength}>
              <span className={styles.noteLabel}>Strength</span>
              Opens on a concrete image with an unresolved tension —
              gives the reader an immediate reason to keep going.
            </div>
            <div className={styles.noteWeakness}>
              <span className={styles.noteLabel}>Worth a look</span>
              The shift from &quot;bulbs&quot; to &quot;horizon&quot; is the
              emotional turn of the paragraph — consider giving it a beat
              more room.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
