import { PERSONA_OPTIONS } from "@/lib/reviewTypes";
import styles from "./Personas.module.css";

export function Personas() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>Choose who reads your work</h2>
          <p className={styles.body}>
            Different readers notice different things. Pick the kind of
            critique that would be most useful for this piece, right now.
          </p>
        </div>
        <ul className={styles.list}>
          {PERSONA_OPTIONS.map((persona) => (
            <li key={persona.value} className={styles.persona}>
              <h3 className={styles.personaTitle}>{persona.label}</h3>
              <p className={styles.personaBody}>{persona.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
