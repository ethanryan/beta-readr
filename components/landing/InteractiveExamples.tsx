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
    selectionLabel: "The complete speech",
    sourceUrl:
      "https://www.abrahamlincolnonline.org/lincoln/speeches/gettysburg.htm",
    text: [
      "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.",
      "Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.",
      "But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced.",
      "It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth.",
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
    selectionLabel: "The complete story",
    sourceUrl: "https://www.gutenberg.org/ebooks/69683",
    text: "The hills across the valley of the Ebro were long and white. On this side there was no shade and no trees and the station was between two lines of rails in the sun. Close against the side of the station there was the warm shadow of the building and a curtain, made of strings of bamboo beads, hung across the open door into the bar, to keep out flies. The American and the girl with him sat at a table in the shade, outside the building. It was very hot and the express from Barcelona would come in forty minutes. It stopped at this junction for two minutes and went on to Madrid.\n\n“What should we drink?” the girl asked. She had taken off her hat and put it on the table.\n\n“It’s pretty hot,” the man said.\n\n“Let’s drink beer.”\n\n“Dos cervezas,” the man said into the curtain.\n\n“Big ones?” a woman asked from the doorway.\n\n“Yes. Two big ones.”\n\nThe woman brought two glasses of beer and two felt pads. She put the felt pads and the beer glasses on the table and looked at the man and the girl. The girl was looking off at the line of hills. They were white in the sun and the country was brown and dry.\n\n“They look like white elephants,” she said.\n\n“I’ve never seen one,” the man drank his beer.\n\n“No, you wouldn’t have.”\n\n“I might have,” the man said. “Just because you say I wouldn’t have doesn’t prove anything.”\n\nThe girl looked at the bead curtain. “They’ve painted something on it,” she said. “What does it say?”\n\n“Anis del Toro. It’s a drink.”\n\n“Could we try it?”\n\nThe man called “Listen” through the curtain. The woman came out from the bar.\n\n“Four reales.”\n\n“We want two Anis del Toro.”\n\n“With water?”\n\n“Do you want it with water?”\n\n“I don’t know,” the girl said. “Is it good with water?”\n\n“It’s all right.”\n\n“You want them with water?” asked the woman.\n\n“Yes, with water.”\n\n“It tastes like licorice,” the girl said and put the glass down.\n\n“That’s the way with everything.”\n\n“Yes,” said the girl. “Everything tastes of licorice. Especially all the things you’ve waited so long for, like absinthe.”\n\n“Oh, cut it out.”\n\n“You started it,” the girl said. “I was being amused. I was having a fine time.”\n\n“Well, let’s try and have a fine time.”\n\n“All right. I was trying. I said the mountains looked like white elephants. Wasn’t that bright?”\n\n“That was bright.”\n\n“I wanted to try this new drink. That’s all we do, isn’t it—look at things and try new drinks?”\n\n“I guess so.”\n\nThe girl looked across at the hills.\n\n“They’re lovely hills,” she said. “They don’t really look like white elephants. I just meant the coloring of their skin through the trees.”\n\n“Should we have another drink?”\n\n“All right.”\n\nThe warm wind blew the bead curtain against the table.\n\n“The beer’s nice and cool,” the man said.\n\n“It’s lovely,” the girl said.\n\n“It’s really an awfully simple operation, Jig,” the man said. “It’s not really an operation at all.”\n\nThe girl looked at the ground the table legs rested on.\n\n“I know you wouldn’t mind it, Jig. It’s really not anything. It’s just to let the air in.”\n\nThe girl did not say anything.\n\n“I’ll go with you and I’ll stay with you all the time. They just let the air in and then it’s all perfectly natural.”\n\n“Then what will we do afterward?”\n\n“We’ll be fine afterward. Just like we were before.”\n\n“What makes you think so?”\n\n“That’s the only thing that bothers us. It’s the only thing that’s made us unhappy.”\n\nThe girl looked at the bead curtain, put her hand out and took hold of two of the strings of beads.\n\n“And you think then we’ll be all right and be happy.”\n\n“I know we will. You don’t have to be afraid. I’ve known lots of people that have done it.”\n\n“So have I,” said the girl. “And afterward they were all so happy.”\n\n“Well,” the man said, “if you don’t want to you don’t have to. I wouldn’t have you do it if you didn’t want to. But I know it’s perfectly simple.”\n\n“And you really want to?”\n\n“I think it’s the best thing to do. But I don’t want you to do it if you don’t really want to.”\n\n“And if I do it you’ll be happy and things will be like they were and you’ll love me?”\n\n“I love you now. You know I love you.”\n\n“I know. But if I do it, then it will be nice again if I say things are like white elephants, and you’ll like it?”\n\n“I’ll love it. I love it now but I just can’t think about it. You know how I get when I worry.”\n\n“If I do it you won’t ever worry?”\n\n“I won’t worry about that because it’s perfectly simple.”\n\n“Then I’ll do it. Because I don’t care about me.”\n\n“What do you mean?”\n\n“I don’t care about me.”\n\n“Well, I care about you.”\n\n“Oh, yes. But I don’t care about me. And I’ll do it and then everything will be fine.”\n\n“I don’t want you to do it if you feel that way.”\n\nThe girl stood up and walked to the end of the station. Across, on the other side, were fields of grain and trees along the banks of the Ebro. Far away, beyond the river, were mountains. The shadow of a cloud moved across the field of grain and she saw the river through the trees.\n\n“And we could have all this,” she said. “And we could have everything and every day we make it more impossible.”\n\n“What did you say?”\n\n“I said we could have everything.”\n\n“We can have everything.”\n\n“No, we can’t.”\n\n“We can have the whole world.”\n\n“No, we can’t.”\n\n“We can go everywhere.”\n\n“No, we can’t. It isn’t ours any more.”\n\n“It’s ours.”\n\n“No, it isn’t. And once they take it away, you never get it back.”\n\n“But they haven’t taken it away.”\n\n“We’ll wait and see.”\n\n“Come on back in the shade,” he said. “You mustn’t feel that way.”\n\n“I don’t feel any way,” the girl said. “I just know things.”\n\n“I don’t want you to do anything that you don’t want to do——”\n\n“Nor that isn’t good for me,” she said. “I know. Could we have another beer?”\n\n“All right. But you’ve got to realize——”\n\n“I realize,” the girl said. “Can’t we maybe stop talking?”\n\nThey sat down at the table and the girl looked across at the hills on the dry side of the valley and the man looked at her and at the table.\n\n“You’ve got to realize,” he said, “that I don’t want you to do it if you don’t want to. I’m perfectly willing to go through with it if it means anything to you.”\n\n“Doesn’t it mean anything to you? We could get along.”\n\n“Of course it does. But I don’t want anybody but you. I don’t want any one else. And I know it’s perfectly simple.”\n\n“Yes, you know it’s perfectly simple.”\n\n“It’s all right for you to say that, but I do know it.”\n\n“Would you do something for me now?”\n\n“I’d do anything for you.”\n\n“Would you please please please please please please please stop talking?”\n\nHe did not say anything but looked at the bags against the wall of the station. There were labels on them from all the hotels where they had spent nights.\n\n“But I don’t want you to,” he said, “I don’t care anything about it.”\n\n“I’ll scream,” the girl said.\n\nThe woman came out through the curtains with two glasses of beer and put them down on the damp felt pads. “The train comes in five minutes,” she said.\n\n“What did she say?” asked the girl.\n\n“That the train is coming in five minutes.”\n\nThe girl smiled brightly at the woman, to thank her.\n\n“I’d better take the bags over to the other side of the station,” the man said. She smiled at him.\n\n“All right. Then come back and we’ll finish the beer.”\n\nHe picked up the two heavy bags and carried them around the station to the other tracks. He looked up the tracks but could not see the train. Coming back, he walked through the barroom, where people waiting for the train were drinking. He drank an Anis at the bar and looked at the people. They were all waiting reasonably for the train. He went out through the bead curtain. She was sitting at the table and smiled at him.\n\n“Do you feel better?” he asked.\n\n“I feel fine,” she said. “There’s nothing wrong with me. I feel fine.”",
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
    selectionLabel: "The complete poem",
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
      "",
      "I've heard it in the chillest land -",
      "And on the strangest Sea -",
      "Yet - never - in Extremity,",
      "It asked a crumb - of me.",
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
  {
    id: "passing",
    shortLabel: "Larsen",
    title: "Passing",
    author: "Nella Larsen",
    form: "Novel",
    selectionLabel: "The excerpt",
    sourceUrl: "https://dpul.princeton.edu/public-domain/catalog/dcgt54m1104",
    text: "It was the last letter in Irene Redfield's little pile of morning mail. After her other ordinary and clearly directed letters the long envelope of thin Italian paper with its almost illegible scrawl seemed out of place and alien. And there was, too, something mysterious and slightly furtive about it. A thin sly thing which bore no return address to betray the sender. Not that she hadn't immediately known who its sender was. Some two years ago she had one very like it in outward appearance. Furtive, but yet in some peculiar, determined way a little flaunting. Purple ink. Foreign paper of extraordinary size.\n\nIt had been, Irene noted, postmarked in New York the day before. Her brows came together in a tiny frown. The frown, however, was more from perplexity than from annoyance; though there was in her thoughts an element of both. She was wholly unable to comprehend such an attitude towards danger as she was sure the letter's contents would reveal; and she disliked the idea of opening and reading it. \n\nThis, she reflected, was of a piece with all that she knew of Clare Kendry. Stepping always on the edge of danger. Always aware, but not drawing back or turning aside. Certainly not because of any alarms or feeling of outrage on the part of others.\n\nAnd for a swift moment Irene Redfield seemed to see a pale small girl sitting on a ragged blue sofa, sewing pieces of bright red cloth together, while her drunken father, a tall, powerfully built man, raged threateningly up and down the shabby room, bellowing curses and making spasmodic lunges at her which were not the less frightening because they were, for the most part, ineffectual. Sometimes he did manage to reach her. But only the fact that the child had edged herself and her poor sewing over to the farthermost corner of the sofa suggested that she was in any way perturbed by this menace to herself and her work.\n\nClare had known well enough that it was unsafe to take a portion of the dollar that was her weekly wage for the doing of many errands for the dressmaker who lived on the top floor of the building of which Bob Kendry was janitor. But that knowledge had not deterred her. She wanted to go to her Sunday school's picnic, and she had made up her mind to wear a new dress. So, in spite of certain unpleasantness and possible danger, she had taken the money to buy the material for that pathetic little red frock.",
    impression:
      "The opening makes an ordinary letter feel charged with secrecy. Before its contents are known, its physical presence creates unease.",
    strengths: [
      "Beginning with the last item in a pile gives the letter immediate narrative importance.",
      "The precise domestic detail creates a calm surface for the tension that follows.",
    ],
    readerExperience:
      "A reader is invited to share Irene’s attention and wonder why this particular letter matters.",
    revisionLens:
      "The opening withholds context deliberately. A writer using this approach should ensure each new detail sharpens, rather than merely delays, the central question.",
  },
  {
    id: "gitanjali",
    shortLabel: "Tagore",
    title: "Where the Mind Is Without Fear",
    author: "Rabindranath Tagore",
    form: "Gitanjali poem",
    selectionLabel: "The complete poem",
    sourceUrl: "https://www.gutenberg.org/ebooks/7164",
    text: [
      "Where the mind is without fear and the head is held high;",
      "Where knowledge is free;",
      "Where the world has not been broken up into fragments by narrow domestic walls;",
      "Where words come out from the depth of truth;",
      "Where tireless striving stretches its arms towards perfection;",
      "Where the clear stream of reason has not lost its way into the dreary desert sand of dead habit;",
      "Where the mind is led forward by thee into ever-widening thought and action—",
      "Into that heaven of freedom, my Father, let my country awake.",
    ].join("\n"),
    impression:
      "The poem presents freedom as a condition of both public life and private thought. Its plain syntax gives the aspiration clarity and urgency.",
    strengths: [
      "The opening joins emotional courage with physical posture, making an abstract ideal visible.",
      "The movement from the individual mind to freely shared knowledge quickly widens the poem’s scope.",
    ],
    readerExperience:
      "A reader encounters the passage as both a wish and a standard against which the present world can be measured.",
    revisionLens:
      "The language is intentionally universal. A contemporary writer might consider when a concrete image would deepen an otherwise abstract appeal.",
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
    <section
      id="examples"
      className={styles.section}
      aria-labelledby="examples-heading"
    >
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
          <p className={styles.selectionNote}>
            These public-domain excerpts were chosen to represent different
            forms, styles, and perspectives.
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
                <p className={styles.kicker}>{selected.selectionLabel}</p>
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
