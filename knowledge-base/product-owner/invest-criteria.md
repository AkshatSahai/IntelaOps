# INVEST Criteria — Deep Dive

## Overview of INVEST

INVEST is an acronym coined by Bill Wake that defines the properties of a high-quality user story. It serves as both a writing guide and a review checklist. A story that fails any INVEST criterion is not sprint-ready — it needs refinement before the team can commit to it. Each letter represents a distinct quality dimension, and they compound: a non-independent story is also usually not small, and a non-testable story is usually not estimable.

## I — Independent

Stories should be deliverable in any order without requiring other stories to be completed first. Dependencies create scheduling complexity, block parallel work, and inflate sprint planning risk.

**How to achieve independence:**
- Split stories along data or workflow lines rather than technical layers
- Avoid stories like "Build the data model for X" that must precede "Display X to the user" — combine them or reframe as a vertical slice
- If two stories genuinely depend on each other, consider merging them into one or elevating to an epic with a clear sequencing note

**Example of a dependent story (bad):** "As a developer, I need the authentication API to be built so I can implement the login form."
**Independent reframe:** "As a user, I want to log in with my email and password so that I can access my account." (The API and form are both part of this story's scope.)

## N — Negotiable

A story is not a contract. The details — how exactly it works, which edge cases to handle, the precise visual treatment — are open for discussion until the sprint begins. The card is an invitation to a conversation, not a specification to implement literally.

**What is negotiable:** Implementation approach, exact UI behavior, edge case handling, scope boundary, order of sub-features.
**What is not negotiable:** The underlying user need and the business value. Negotiate the "how," not the "why."

**Sign of a non-negotiable story:** The acceptance criteria are written at the pixel level, or the story specifies a particular technology choice. Push back and ask: "What outcome are we actually trying to achieve?"

## V — Valuable

Every story must deliver value to a user or the business. Stories that only serve technical purposes — refactoring, infrastructure changes, schema migrations — should be framed as enablers for future user-visible value, or bundled into a story that produces visible value.

**Test for value:** "If we skipped this story entirely, would any user notice or care?" If yes, it's valuable. If no, reconsider whether it belongs as a standalone story.

**Valuable framing:** Even technical stories can be framed with value. "Migrate the database to PostgreSQL" becomes "As a product owner, I want query performance to support 100k concurrent users so that we can launch to the enterprise segment."

## E — Estimable

If a team cannot estimate a story, they cannot plan with it. Stories become non-estimable for three reasons: the story is too large to reason about, the domain is too unfamiliar, or there is too much ambiguity in the requirements.

**Remedies by cause:**
- Too large: Split into smaller stories
- Domain unfamiliar: Schedule a spike (time-boxed research task) to reduce uncertainty before estimation
- Too ambiguous: Conduct a refinement session to clarify acceptance criteria until the team agrees on scope

A spike should itself be estimable (e.g., "2 days of research to evaluate three authentication library options"). Spikes are not open-ended.

## S — Small

Stories should fit within a single sprint. As a rule of thumb, a single developer or pair should be able to complete a story within two to three days of focused work. Stories larger than 8 story points almost always need splitting.

**Why small matters:** Small stories reduce risk, enable faster feedback, create clearer progress signals, and simplify code review. Large stories hide complexity, block review until late in the sprint, and make sprint commitments unreliable.

**Small does not mean trivial.** A story can be genuinely complex and still be small if it is well-scoped. Complexity lives in the technical implementation; smallness is about the scope of the user-visible outcome.

## T — Testable

A story is testable when it has clear, verifiable acceptance criteria that allow a person (or automated test) to determine pass or fail without interpretation.

**Non-testable stories use vague language:** "The UI should feel responsive." "The page should load quickly." "Users should find it intuitive."
**Testable rewrites:** "The page should load within 1.5 seconds on a 4G connection." "The list should update within 200ms of a filter change." "Users can complete the onboarding flow without accessing help documentation."

Testability is the enforcement mechanism for all the other INVEST properties. A story without acceptance criteria cannot be confirmed valuable, cannot be estimated accurately, and cannot be declared done.
