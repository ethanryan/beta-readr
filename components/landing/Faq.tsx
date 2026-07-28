import { SUBMISSION_LIMITS } from "@/lib/reviewTypes";
import styles from "./Faq.module.css";

const FAQ_ITEMS = [
  {
    question: "How is betaReadr different from asking ChatGPT to rewrite my writing?",
    answer:
      "betaReadr is built specifically to give structured critique rather than a replacement draft. Every review identifies strengths, weaknesses, how a reader is likely to experience the piece, and the revisions that would help most — while protecting your voice instead of replacing it.",
  },
  {
    question: "Will betaReadr rewrite my work?",
    answer:
      "No. betaReadr may quote a short excerpt or describe a possible approach in words, but it does not rewrite your full submission or generate a replacement version for you to paste in.",
  },
  {
    question: "What kinds of writing can I submit?",
    answer:
      "Fiction, novel chapters, short stories, memoir, essays, poetry, articles, blog posts, professional writing, social posts, and other written work. Feedback adapts to the type and purpose of the piece.",
  },
  {
    question: "Is the feedback always positive?",
    answer:
      "The feedback is encouraging but honest. Every review names both meaningful strengths and areas that could be stronger — writing that only heard praise wouldn't actually be getting feedback.",
  },
  {
    question: "Are my submissions saved?",
    answer:
      "For this version of betaReadr, submissions are sent to the configured AI provider (OpenAI) to generate feedback and are not intentionally saved to a betaReadr database. We don't log or store your full submission on our servers beyond what's needed to process the request.",
  },
  {
    question: "How long can my submission be?",
    answer: `The current limit is ${SUBMISSION_LIMITS.maxCharacters.toLocaleString()} characters. Support for longer manuscripts, like full chapters submitted together, may be added in a future version.`,
  },
];

export function Faq() {
  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Frequently asked questions</h2>
        <div className={styles.list}>
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary className={styles.question}>{item.question}</summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
