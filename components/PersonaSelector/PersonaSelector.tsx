"use client";

import { PERSONA_OPTIONS } from "@/lib/reviewTypes";
import type { Persona } from "@/types/review";
import styles from "./PersonaSelector.module.css";

type Props = {
  value: Persona | "";
  onChange: (persona: Persona) => void;
  error?: string;
};

export function PersonaSelector({ value, onChange, error }: Props) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        Choose your feedback style<span aria-hidden="true"> *</span>
      </legend>
      <div className={styles.options} role="radiogroup" aria-describedby={error ? "persona-error" : undefined}>
        {PERSONA_OPTIONS.map((persona) => (
          <label
            key={persona.value}
            className={styles.option}
            data-active={value === persona.value}
          >
            <input
              type="radio"
              name="persona"
              value={persona.value}
              checked={value === persona.value}
              onChange={() => onChange(persona.value)}
            />
            <span>
              <span className={styles.optionTitle}>{persona.label}</span>
              <span className={styles.optionBody}>{persona.description}</span>
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id="persona-error" className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
