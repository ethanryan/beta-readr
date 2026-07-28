import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    title: "Share your writing",
    body: "Paste your text or upload a .txt, .md, or .docx file — a chapter, an essay, a poem, a post, whatever you're working on.",
  },
  {
    title: "Choose your reader",
    body: "Pick the kind of feedback that would help most, from a supportive coach to a candid workshop partner to your intended audience.",
  },
  {
    title: "Get thoughtful feedback",
    body: "Read a structured review that names what's working, what to revise, and questions worth sitting with — in your own words, not a rewritten draft.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>How it works</h2>
        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
