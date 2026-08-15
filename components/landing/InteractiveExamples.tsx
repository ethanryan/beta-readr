"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { HOMEPAGE_DRAFT_KEY } from "@/lib/draftTransfer";
import styles from "./InteractiveExamples.module.css";

const EXAMPLES = [
  {
    id: "gettysburg-address",
    shortLabel: "Lincoln",
    title: "The Gettysburg Address",
    author: "Abraham Lincoln",
    form: "Speech",
    sourceUrl:
      "https://www.loc.gov/exhibits/gettysburg-address/ext/trans-hay-draft.html",
    text: [
      "Four score and seven years ago our fathers brought forth, upon this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.",
      "But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground. The brave men, living and dead, who struggled here, have consecrated it far above our poor power to add or detract. The world will little note, nor long remember what we say here, but can never forget what they did here.",
    ].join("\n\n"),
    impression:
      "The speech turns remembrance into responsibility. Its compression and repetition give a brief address unusual moral force.",
    strengths: [
      "The repeated structure of “we can not dedicate—we can not consecrate—we can not hallow” builds rhythm while humbling the speaker.",
      "The contrast between what the world may forget and what it cannot forget makes the sacrifice feel immediate.",
    ],
    readerExperience:
      "A reader moves quickly from national history to the human meaning of this particular ground.",
    revisionLens:
      "The abstract opening asks a great deal of the reader before the speech reaches the battlefield. A modern writer might consider how soon to introduce a concrete scene.",
  },
  {
    id: "hills-like-white-elephants",
    shortLabel: "Hemingway",
    title: "Hills Like White Elephants",
    author: "Ernest Hemingway",
    form: "Short story",
    sourceUrl: "https://www.gutenberg.org/ebooks/69683",
    text: [
      "The hills across the valley of the Ebro were long and white. On this side there was no shade and no trees and the station was between two lines of rails in the sun. …",
      "The American and the girl with him sat at a table in the shade, outside the building. It was very hot and the express from Barcelona would come in forty minutes.",
      "“They look like white elephants,” she said.",
      "“I've never seen one,” the man drank his beer.",
      "“No, you wouldn't have.”",
    ].join("\n\n"),
    impression:
      "The scene feels spare but charged. A quiet disagreement appears almost immediately beneath ordinary observations and small talk.",
    strengths: [
      "The exposed station and oppressive heat create tension before the characters say anything consequential.",
      "“No, you wouldn't have” turns a casual image into a personal challenge, revealing conflict through implication.",
    ],
    readerExperience:
      "A reader senses that the real subject is being avoided and begins watching every line for what the couple will not say directly.",
    revisionLens:
      "The restraint is powerful, but it depends on readers trusting the omissions. A writer using this approach should make sure each indirect exchange changes the emotional pressure.",
  },
  {
    id: "hope-is-the-thing-with-feathers",
    shortLabel: "Dickinson",
    title: "“Hope” is the thing with feathers",
    author: "Emily Dickinson",
    form: "Poem",
    sourceUrl:
      "https://www.poetryfoundation.org/poems/42889/hope-is-the-thing-with-feathers-314",
    text: [
      "“Hope” is the thing with feathers -",
      "That perches in the soul -",
      "And sings the tune without the words -",
      "And never stops - at all -",
      "",
      "And sweetest - in the Gale - is heard -",
      "And sore must be the storm -",
      "That could abash the little Bird",
      "That kept so many warm -",
    ].join("\n"),
    impression:
      "The poem makes an abstract feeling tangible without explaining it away. Its small central image carries warmth, persistence, and vulnerability at once.",
    strengths: [
      "The bird metaphor gives hope motion and sound, allowing the reader to experience the idea rather than receive a definition.",
      "The shift from a private soul to a violent storm tests the metaphor and makes its optimism feel earned.",
    ],
    readerExperience:
      "The short lines and recurring dashes make the poem feel light on the page while the storm imagery gradually raises the stakes.",
    revisionLens:
      "The familiar bird metaphor risks becoming sentimental, but the severity of “sore must be the storm” supplies useful resistance.",
  },
] as const;

type ExampleId = (typeof EXAMPLES)[number]["id"];

export function InteractiveExamples() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<ExampleId>(EXAMPLES[0].id);
  const selected =
    EXAMPLES.find((example) => example.id === selectedId) ?? EXAMPLES[0];

  function selectExample(id: ExampleId) {
    setSelectedId(id);
    track({ name: "example_selected", example: id });
  }

  function tryExample() {
    sessionStorage.setItem(
      HOMEPAGE_DRAFT_KEY,
      JSON.stringify({
        method: "paste",
        pastedText: selected.text,
        file: null,
      }),
    );
    track({ name: "example_review_started", example: selected.id });
    router.push("/review");
  }

  return (
    <section className={styles.section} aria-labelledby="examples-heading">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Example review</p>
          <h2 id="examples-heading" className={styles.heading}>
            See betaReadr in action
          </h2>
          <p className={styles.support}>
            Choose a familiar piece to see the kind of thoughtful, specific
            feedback betaReadr provides.
          </p>
        </div>

        <div className={styles.tabs} role="group" aria-label="Example writing">
          {EXAMPLES.map((example) => (
            <button
              key={example.id}
              type="button"
              aria-pressed={selected.id === example.id}
              className={styles.tab}
              onClick={() => selectExample(example.id)}
            >
              <span>{example.shortLabel}</span>
              <small>{example.form}</small>
            </button>
          ))}
        </div>

        <div className={styles.panel}>
          <article className={styles.writing}>
            <div className={styles.pieceHeader}>
              <div>
                <p className={styles.kicker}>The excerpt</p>
                <h3 className={styles.pieceTitle}>{selected.title}</h3>
                <p className={styles.byline}>by {selected.author}</p>
              </div>
              <a
                className={styles.source}
                href={selected.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                Source
              </a>
            </div>
            <p className={styles.excerpt}>{selected.text}</p>
          </article>

          <article className={styles.feedback}>
            <p className={styles.kicker}>betaReadr feedback</p>
            <p className={styles.impression}>{selected.impression}</p>

            <h4 className={styles.feedbackHeading}>What’s working</h4>
            <ul className={styles.strengths}>
              {selected.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>

            <h4 className={styles.feedbackHeading}>Reader experience</h4>
            <p className={styles.feedbackText}>{selected.readerExperience}</p>

            <h4 className={styles.revisionHeading}>Worth examining</h4>
            <p className={styles.feedbackText}>{selected.revisionLens}</p>

            <button type="button" className={styles.cta} onClick={tryExample}>
              Try this writing yourself
            </button>
          </article>
        </div>

        <p className={styles.note}>
          Saved sample feedback. Selecting an example does not make an AI
          request.
        </p>
      </div>
    </section>
  );
}
