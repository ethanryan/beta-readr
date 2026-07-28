import styles from "./WhatWeReview.module.css";

const WRITING_TYPES = [
  "Fiction",
  "Novel chapters",
  "Short stories",
  "Memoir",
  "Essays",
  "Poetry",
  "Articles",
  "Blog posts",
  "Professional writing",
  "LinkedIn posts",
  "Social media writing",
  "Other written work",
];

export function WhatWeReview() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>What betaReadr reviews</h2>
          <p className={styles.body}>
            Feedback adapts to the type and purpose of your writing. A poem
            and a LinkedIn post ask different things of a reader, so
            betaReadr reads each on its own terms.
          </p>
        </div>
        <ul className={styles.list}>
          {WRITING_TYPES.map((type) => (
            <li key={type} className={styles.item}>
              {type}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
