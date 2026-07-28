import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using betaReadr.",
};

export default function TermsPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Terms of Service</h1>
      <p className={styles.updated}>Last updated: July 2026</p>

      <p className={styles.notice}>
        This is a plain-language MVP terms of service. It has not been
        drafted or reviewed by a lawyer and should be reviewed by one before
        betaReadr is relied on as a production legal agreement.
      </p>

      <h2 className={styles.subheading}>What betaReadr is</h2>
      <p className={styles.body}>
        betaReadr provides AI-generated feedback on writing you submit. It is
        intended to help you understand your own writing more clearly — it
        is not an editing, publishing, or ghostwriting service, and it does
        not produce a rewritten or replacement version of your work.
      </p>

      <h2 className={styles.subheading}>Your content</h2>
      <p className={styles.body}>
        You retain all rights to the writing you submit. By submitting
        writing, you confirm that you have the right to share it and to have
        it processed by our AI provider for the purpose of generating
        feedback. Do not submit writing that you do not have the right to
        share.
      </p>

      <h2 className={styles.subheading}>Acceptable use</h2>
      <p className={styles.body}>
        Please don&apos;t use betaReadr to submit unlawful content, attempt
        to disrupt the service, or attempt to extract the underlying system
        prompts or infrastructure details through adversarial inputs.
      </p>

      <h2 className={styles.subheading}>No professional advice</h2>
      <p className={styles.body}>
        Feedback from betaReadr reflects an AI model&apos;s reading of your
        text and is not professional editorial, legal, medical, financial,
        or other expert advice. Craft feedback is inherently subjective —
        use your own judgment about what to apply.
      </p>

      <h2 className={styles.subheading}>No warranty</h2>
      <p className={styles.body}>
        betaReadr is provided &ldquo;as is,&rdquo; without warranties of any
        kind, express or implied. We do not guarantee that feedback will be
        error-free, complete, or suited to any particular purpose.
      </p>

      <h2 className={styles.subheading}>Limitation of liability</h2>
      <p className={styles.body}>
        To the fullest extent permitted by law, betaReadr and its operators
        are not liable for any indirect, incidental, or consequential
        damages arising from your use of the service.
      </p>

      <h2 className={styles.subheading}>Changes</h2>
      <p className={styles.body}>
        We may update these terms as betaReadr changes. Continued use of the
        service after changes are posted means you accept the updated terms.
      </p>

      <h2 className={styles.subheading}>Contact</h2>
      <p className={styles.body}>
        Questions about these terms can be sent to{" "}
        <a href="mailto:hello@betareadr.app">hello@betareadr.app</a>.
      </p>
    </div>
  );
}
