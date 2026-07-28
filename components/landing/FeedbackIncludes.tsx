import styles from "./FeedbackIncludes.module.css";

const AREAS = [
  {
    title: "Strengths",
    body: "Given real, substantial attention — never a token compliment on the way to criticism.",
  },
  {
    title: "Weaknesses",
    body: "Framed as opportunities you can act on, not just problems named and left there.",
  },
  {
    title: "Clarity",
    body: "Where meaning might land differently for a reader than you intend.",
  },
  {
    title: "Structure",
    body: "How the piece is organized, paced, and built to do what it's trying to do.",
  },
  {
    title: "Style and voice",
    body: "What's distinctive about how you write, and where it could be sharper.",
  },
  {
    title: "Reader reactions",
    body: "How an engaged reader is likely to experience the piece, moment to moment.",
  },
  {
    title: "Revision priorities",
    body: "The handful of changes that would help most, ordered by impact.",
  },
  {
    title: "Questions for you",
    body: "Open questions worth sitting with as you revise.",
  },
];

export function FeedbackIncludes() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>What feedback includes</h2>
        <div className={styles.grid}>
          {AREAS.map((area) => (
            <div key={area.title} className={styles.area}>
              <h3 className={styles.areaTitle}>{area.title}</h3>
              <p className={styles.areaBody}>{area.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
