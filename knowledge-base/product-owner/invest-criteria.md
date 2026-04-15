# INVEST Criteria — Deep Dive

## Overview

INVEST is a mnemonic for evaluating user story quality. Stories that fail INVEST are candidates for refinement before entering a sprint.

## I — Independent

**Goal:** Each story can be developed, tested, and released independently.

**Why it matters:** Dependencies create scheduling constraints, bottlenecks, and make sprint planning harder. They also prevent the team from reordering the backlog freely.

**How to achieve it:**
- Split stories along business value lines, not technical layers
- If two stories always go together, merge them into one
- Use spike stories to resolve technical dependencies before implementation stories are planned
- Accept some duplication at the architecture level to preserve story independence

**Red flags:** "This must be done before story X", "We need the backend ticket first"

## N — Negotiable

**Goal:** Stories are not fixed contracts. The details are open to discussion.

**Why it matters:** Treating stories as specifications kills collaboration. The team should be empowered to suggest better solutions.

**How to achieve it:**
- Write stories with minimal implementation detail
- Store options and decisions in comments, not the story body
- Re-open scope discussions at refinement if new information emerges

**Red flags:** Stories with detailed wireframes, specific API contracts, or technology prescriptions embedded in the description

## V — Valuable

**Goal:** Every story delivers value to the end user or business — not just technical teams.

**Why it matters:** Stories that only deliver value when combined with other stories are incomplete. If a story could be cancelled and nobody would care, it's not valuable enough.

**How to achieve it:**
- Always write the "so that" clause — it forces articulation of value
- Ask: "Who benefits if we ship just this story?"
- Refactoring stories are valid if they reduce future costs or risks (frame the value accordingly)

**Red flags:** Missing "so that" clause, value only realised when combined with 3 other stories

## E — Estimable

**Goal:** The team can estimate the effort required.

**Why it matters:** If you can't estimate a story, you can't plan a sprint. Inestimable stories signal missing information or unknowns.

**How to achieve it:**
- Use spike stories to explore unknowns before estimation
- Break complex domain problems into smaller, more understood pieces
- Ensure the team has enough context (domain knowledge, technical background)

**Red flags:** "We need to investigate before we can estimate", very high story points (>13)

## S — Small

**Goal:** A story fits within one sprint (ideally a few days of work).

**Why it matters:** Large stories are hard to estimate, test, and complete within a sprint. They hide complexity and create end-of-sprint surprises.

**How to achieve it:**
- Use story splitting patterns (by workflow step, data variation, user role)
- Aim for stories that can be completed in 1–3 days by one developer
- Epics are for planning horizons beyond one sprint — break them down before sprint planning

**Red flags:** Story points > 8, multiple distinct user interactions in one story

## T — Testable

**Goal:** There is a clear way to verify the story is done.

**Why it matters:** Untestable stories create ambiguity about what "done" means. Testing should be possible before or during development (TDD/BDD).

**How to achieve it:**
- Write at least 3 acceptance criteria in Given/When/Then format
- Include both happy path and key failure scenarios
- Avoid acceptance criteria with subjective language ("looks good", "performs well")

**Red flags:** No acceptance criteria, acceptance criteria with subjective language, stories that can only be tested by users in production

## INVEST Scoring Template

| Criterion | Pass (1) | Fail (0) | Notes |
|-----------|----------|----------|-------|
| Independent | | | |
| Negotiable | | | |
| Valuable | | | |
| Estimable | | | |
| Small | | | |
| Testable | | | |
| **Total** | /6 | | |

Stories scoring 4 or below should be refined before sprint planning.
