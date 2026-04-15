# User Story Best Practices

## What a User Story Is (and Isn't)

A user story is a short, simple description of a feature told from the perspective of the person who desires the new capability — usually a user or customer of the system. Stories are NOT requirements documents. They are conversation placeholders.

**Standard format:**
> As a [type of user], I want [some goal] so that [some reason].

## The Three C's

- **Card**: A physical or digital card representing the story (short, reminder-level detail)
- **Conversation**: The real detail lives in the ongoing discussion between the team and stakeholders
- **Confirmation**: Acceptance criteria that define when the story is done

## INVEST Criteria

Every story should pass the INVEST test:

| Letter | Criterion | What It Means |
|--------|-----------|---------------|
| I | Independent | Can be developed without depending on other stories |
| N | Negotiable | Details are open to discussion, not fixed contracts |
| V | Valuable | Delivers value to the user or business |
| E | Estimable | Team can estimate its size |
| S | Small | Fits within a single sprint |
| T | Testable | Has clear criteria for acceptance |

## Story Splitting Patterns

When a story is too large, split it using these patterns:

1. **By workflow step** — Happy path first, then error/edge cases
2. **By data variation** — Handle one data type first, then others
3. **By user role** — Start with primary user, add secondary users later
4. **By interface** — Implement core logic first, UI second
5. **By performance** — Functional first, then fast
6. **By CRUD** — Read before Write before Delete

## Common Mistakes

- Writing stories from a system perspective ("The system shall…") instead of user perspective
- Including solution/implementation details in the story
- Making stories too large (epics disguised as stories)
- Writing stories so small they have no standalone value
- Skipping the "so that" — the business value is the most important part
- Conflating acceptance criteria with test cases

## Acceptance Criteria Format

Use Given/When/Then (Gherkin) format for testable criteria:

```
Given [precondition / initial context]
When [action is taken]
Then [expected outcome]
```

Multiple scenarios per story are fine. Aim for 3–7 scenarios covering happy path and key edge cases.

## Story Points vs Hours

Story points measure relative complexity, effort, and uncertainty — not time. Use the Fibonacci sequence (1, 2, 3, 5, 8, 13, 21) or T-shirt sizing. Anything larger than 8 points usually needs splitting. Never convert story points to hours in planning discussions.
