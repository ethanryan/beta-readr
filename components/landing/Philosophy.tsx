import styles from "./Philosophy.module.css";

const DOES = [
  "See their work more clearly",
  "Understand the reader's experience",
  "Identify strengths",
  "Find weaknesses and opportunities",
  "Decide what to revise",
  "Preserve their own voice",
];

const DOES_NOT = [
  "Generate a replacement draft",
  "Rewrite the whole submission",
  "Smooth your style into something generic",
  "Take ownership of your voice",
];

export function Philosophy() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>The core idea</p>
        <h2 className={styles.tagline}>
          AI feedback <span className={styles.without}>without</span> AI
          ghostwriting.
        </h2>

        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.columnHeading}>betaReadr helps writers</h3>
            <ul className={styles.list}>
              {DOES.map((item) => (
                <li key={item} className={styles.listItemStrength}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnHeading}>betaReadr does not</h3>
            <ul className={styles.list}>
              {DOES_NOT.map((item) => (
                <li key={item} className={styles.listItemWeakness}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
