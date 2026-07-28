import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How betaReadr handles the writing and information you submit.",
};

export default function PrivacyPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: July 2026</p>

      <p className={styles.notice}>
        This is a plain-language MVP privacy policy. It has not been drafted
        or reviewed by a lawyer and should be reviewed by one before
        betaReadr is used to handle real users&apos; data at scale.
      </p>

      <h2 className={styles.subheading}>What we collect</h2>
      <p className={styles.body}>
        When you request feedback, betaReadr sends the writing you submit —
        along with any optional title, context, or focus notes you provide —
        to our configured AI provider (OpenAI) in order to generate your
        review. We do not require an account, and we do not ask for your
        name, email address, or payment information to use the MVP.
      </p>

      <h2 className={styles.subheading}>What we don&apos;t do</h2>
      <p className={styles.body}>
        betaReadr does not save your submissions to a betaReadr database, and
        we do not log the full text of your writing on our own servers. We
        do not include the content of your writing in analytics events. We
        do not sell your writing or use it to train our own models.
      </p>

      <h2 className={styles.subheading}>Our AI provider</h2>
      <p className={styles.body}>
        Submitted writing is processed by OpenAI&apos;s API to generate
        feedback. OpenAI&apos;s handling of data sent through its API is
        governed by OpenAI&apos;s own policies, which are outside
        betaReadr&apos;s control. We encourage you to avoid submitting
        writing that contains sensitive personal information about yourself
        or others.
      </p>

      <h2 className={styles.subheading}>What we don&apos;t promise</h2>
      <p className={styles.body}>
        We do not claim that your submissions are fully private, encrypted
        beyond what the underlying infrastructure provides, or guaranteed
        never to be retained by any third party. Standard web infrastructure
        (such as hosting and network logs) may briefly retain request
        metadata as part of normal operation.
      </p>

      <h2 className={styles.subheading}>Analytics</h2>
      <p className={styles.body}>
        betaReadr is built with a lightweight, typed analytics abstraction
        for basic product events (like a review being started or completed).
        No analytics provider is connected in this version, and the content
        of your writing is never included in an analytics event.
      </p>

      <h2 className={styles.subheading}>Changes to this policy</h2>
      <p className={styles.body}>
        As betaReadr adds features like accounts or saved review history,
        this policy will be updated to accurately reflect what is collected
        and stored.
      </p>

      <h2 className={styles.subheading}>Contact</h2>
      <p className={styles.body}>
        Questions about this policy can be sent to{" "}
        <a href="mailto:hello@betareadr.app">hello@betareadr.app</a>.
      </p>
    </div>
  );
}
