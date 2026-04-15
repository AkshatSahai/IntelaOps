# User Story Best Practices

## What a User Story Is (and Isn't)

A user story is a short, simple description of a feature told from the perspective of the person who desires the new capability — usually a user or customer of the system. Stories are NOT requirements documents, specifications, or contracts. They are conversation placeholders: a commitment to have a deeper discussion about the need when the time comes.

**Standard format:**
> As a [type of user], I want [some goal] so that [some reason].

The "so that" clause is the most critical part. It captures the business value — the *why* behind the request. Without it, the team is building to a specification rather than solving a problem.

## The Three C's Foundation

Every well-formed user story rests on three pillars:

- **Card**: A physical or digital card representing the story — short, reminder-level detail only. The card is not the story; it is the label on the box.
- **Conversation**: The real detail lives in the ongoing discussion between the team, product owner, and stakeholders. Conversations happen during refinement, sprint planning, and daily development.
- **Confirmation**: Acceptance criteria that define when the story is done. These are the explicit tests that confirm the conversation resulted in shared understanding.

Teams that skip the conversation and treat the card as the specification produce software that matches the words but misses the intent.

## INVEST Criteria

Every story should pass the INVEST test before it enters a sprint:

| Letter | Criterion | What It Means |
|--------|-----------|---------------|
| I | Independent | Can be developed without depending on other stories |
| N | Negotiable | Details are open to discussion, not fixed contracts |
| V | Valuable | Delivers value to the user or business |
| E | Estimable | Team can estimate its size with reasonable confidence |
| S | Small | Fits within a single sprint |
| T | Testable | Has clear, verifiable acceptance criteria |

A story that fails INVEST is a signal — not a blocker. Use the failure to have the right conversation: split it, negotiate the scope, or define the acceptance criteria more clearly.

## Story Splitting Patterns

Large stories (epics disguised as stories) are the most common backlog problem. Use these patterns to split without destroying value:

1. **By workflow step** — Implement the happy path first, then add error handling and edge cases as separate stories
2. **By data variation** — Handle one data type or input format first, then extend to others
3. **By user role** — Start with the primary user's needs; add secondary roles as follow-on stories
4. **By interface** — Implement core logic first, then the UI layer, then polish
5. **By performance** — Deliver functional behavior first; optimize in a subsequent story
6. **By CRUD operation** — Read before Write; Create before Update before Delete
7. **By acceptance criterion** — If a story has 10 acceptance criteria, groups of 2-3 can often be separate stories

Each split must still be independently valuable. If a story only makes sense in the context of another story, reconsider the split.

## Common Anti-Patterns

**System perspective stories**: "The system shall validate the email address" describes an implementation. Stories describe human goals. Rewrite as: "As a new user, I want to know immediately if my email is invalid so that I don't have to wait for a failure email."

**Solution-embedded stories**: "As a user, I want a dropdown menu to filter results" bakes in the solution. Leave room for the team to find the best approach: "As a user, I want to narrow results by category so that I find what I'm looking for faster."

**Epic-as-story**: A story that will clearly take more than one sprint is an epic. Break it down. No story should score higher than 8 story points in planning poker.

**Missing business value**: A story without a "so that" forces the team to guess at the priority and the acceptable trade-offs.

**Criteria as test scripts**: Acceptance criteria define what success looks like, not the step-by-step test procedure. Keep criteria at the behavior level.

## Writing Acceptance Criteria

Use Given/When/Then (Gherkin) format for testable, behaviour-driven criteria:

```
Given [precondition / initial context]
When [action is taken]
Then [expected outcome]
```

Aim for 3–7 scenarios per story: the happy path, the key error states, and the most important edge cases. Avoid writing every possible scenario — focus on the ones that matter for sign-off.

## Story Points and Sizing

Story points measure relative complexity, uncertainty, and effort — not time. Use the Fibonacci sequence (1, 2, 3, 5, 8, 13, 21) for planning poker. A story larger than 8 points almost always needs splitting. Never convert story points to hours in planning discussions — it defeats the purpose of relative estimation and reintroduces false precision.
