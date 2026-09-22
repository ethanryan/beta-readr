# betaReadr Product Roadmap

Last updated: September 22, 2026

## Product position

**betaReadr — AI feedback without AI ghostwriting.**

betaReadr should feel like a virtual writing workshop: several intelligent readers with distinct tastes respond to a writer's work over time without rewriting it. Its central advantage is qualitative reader response—how writing lands, where readers agree, and where interpretation or taste differs.

## Current direction

- Accept pasted writing and document uploads.
- Support fiction, essays, posts, and other prose.
- Always identify strengths as well as weaknesses.
- Keep feedback diagnostic and encouraging; do not ghostwrite.
- Offer limited free feedback after email capture, with paid access to the complete workshop.
- Evaluate sustainable paid pricing rather than assuming a very low one-time price.

## Priority initiative: The Virtual Writing Workshop

### 1. Five fixed, named expert readers

Create five persistent betaReadr personas. Each should have a recognizable editorial specialty, taste, temperament, and voice—not merely a differently worded prompt. The same readers should return across critiques so writers learn how to interpret their reactions.

Initial roles to define during product design:

1. A developmental reader focused on structure, stakes, pacing, and character arcs.
2. A line-level reader focused on language, clarity, rhythm, and repetition.
3. An emotional reader focused on engagement, credibility, empathy, and felt experience.
4. A skeptical reader focused on confusion, logic, continuity, and unsupported assumptions.
5. A genre-and-audience reader focused on expectations, originality, and likely audience response.

The names, biographies, and exact boundaries remain a dedicated design task. Personas should not imitate living authors or pretend to be human.

### 2. Manuscript Memory

Manuscript Memory remembers everything within one writing project across sessions.

It should retain and make available to the readers:

- Submitted chapters and revisions
- Characters, relationships, settings, and chronology
- Recurring themes, terms, and stylistic patterns
- Earlier reader observations and unresolved concerns
- Author-provided intentions, audience, genre, and project notes
- Revision history and which feedback has been addressed

Memory is strictly project-scoped. Information from one project must not leak into another. Writers should be able to inspect, correct, and delete remembered project information.

### 3. Independent reads, consensus, and disagreement

Each persona should first respond independently using the shared Manuscript Memory. A separate synthesis step should then display:

- Points supported by several readers
- Strong consensus concerns
- Meaningful disagreements in taste or interpretation
- Observations unique to one specialist
- Places where different readers understood the passage differently

Do not flatten disagreement into a single authoritative score. Disagreement is useful workshop information and should remain visible.

### 4. Evidence-linked comments

Every actionable observation should cite the exact sentence, passage, scene, or chapter that prompted it. Selecting feedback should jump to and highlight that evidence in the manuscript.

Feedback should distinguish:

- Direct textual evidence
- A reader's interpretation
- A broader manuscript-level pattern
- A possible question for the writer, rather than a claimed defect

### 5. Feedback ledger and automatic resolution tracking

Turn feedback into a persistent project checklist. Each item should show its reader, supporting evidence, category, importance, and current status.

Suggested statuses:

- Open
- Likely addressed
- Resolved ✓
- Intentionally unchanged
- Reopened

After a revision, betaReadr should compare the relevant text and automatically mark feedback resolved when the underlying concern has been addressed. Each automatic resolution must include a short explanation of what changed. Writers can reopen an item or mark it intentionally unchanged at any time.

Automatic resolution must be conservative. A deleted sentence does not necessarily resolve a scene-level or manuscript-level concern. Low-confidence cases should be labeled **Likely addressed** rather than checked off as resolved.

## Diagnostic expansion

Build focused analytical passes that the workshop can incorporate:

- Overused words and nearby repetitions
- Repeated sentence openings
- Repeated gestures and dialogue-tag patterns
- Repeated phrases and favorite adjectives/adverbs
- Cross-chapter echoes and repetition
- Pacing and scene momentum
- Character motivation and emotional credibility
- Dialogue differentiation
- Point-of-view consistency
- Continuity and unresolved narrative promises

These tools should identify patterns and explain their effect without rewriting the author's prose.

## Later opportunities

- Invite human beta readers and combine their comments with the virtual workshop.
- Track agreement between human and AI readers.
- Allow optional specialist readers beyond the fixed five.
- Provide project-level progress views across a full manuscript.
- Add cross-book memory only if writers clearly need series support.

## Explicitly out of scope for now

- A full Scrivener-style writing environment
- AI-generated prose or automatic rewrites
- Book formatting, EPUB production, or publishing tools
- An extensive world-building database
- User-created personas in the initial version
- Memory shared across unrelated writing projects

## Recommended implementation sequence

1. Define and test the five reader personas on the same sample texts.
2. Standardize evidence-linked feedback into a shared structured format.
3. Build the feedback ledger with manual status controls.
4. Add project containers and Manuscript Memory.
5. Run independent persona critiques and synthesize consensus/disagreement.
6. Add revision comparison and conservative automatic resolution detection.
7. Expand cross-chapter diagnostic passes.
8. Test pricing, limits, and the free-to-paid workshop conversion.

## Success criteria

- Writers can clearly explain how the five readers differ.
- Feedback consistently cites relevant textual evidence.
- Consensus highlights meaningful issues without erasing dissent.
- Manuscript Memory improves later feedback and never crosses project boundaries.
- Automatically checked items are accurate enough that writers trust the ledger.
- Users return with revisions rather than treating betaReadr as a one-time critique generator.
