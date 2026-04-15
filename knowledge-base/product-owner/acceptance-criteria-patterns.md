# Acceptance Criteria Patterns

## Purpose and Role of Acceptance Criteria

Acceptance criteria define the boundaries of a user story — what the system must do for the story to be considered done. They serve as the contract between the product owner, development team, and stakeholders. Well-written acceptance criteria eliminate ambiguity at sign-off, give testers a clear checklist, and help developers understand scope before they write a single line of code.

Acceptance criteria answer three questions: What is in scope? What is out of scope? What does "done" look like for this story?

## Given/When/Then Format (Gherkin)

The preferred format for testable, behaviour-driven acceptance criteria:

```
Scenario: [descriptive name]
  Given [precondition / initial context]
  When [action taken by user or system]
  Then [expected observable outcome]
  And [additional outcome, if needed]
```

Each scenario should be independently understandable. The scenario name should describe the situation, not the expected result. Good: "User submits form with missing required field." Bad: "Error shown."

## Rule-Oriented Format

For business rules that don't fit neatly into a scenario, state them as declarative rules:

```
- Users with role [X] may [action]; users without role [X] may not.
- When [event] occurs, [outcome] must happen within [time constraint].
- The system must not allow [condition] unless [exception].
```

Rule-oriented format works well for authorization rules, data constraints, and SLA requirements. Gherkin format works better for user-interaction flows.

## Patterns by Story Type

**Authentication and Access Control:**
- Given a user is not authenticated, when they navigate to a protected route, then they are redirected to the login page with a return URL preserved.
- Given a user has role "viewer," when they attempt to submit a form, then the submit button is disabled and a "read-only" indicator is visible.
- Given a session token has expired, when the user makes an API request, then they receive a 401 and are redirected to re-authenticate.

**Search and Filter:**
- Given results exist matching the search term, when the user searches, then only matching results appear within 500ms.
- Given no results match the query, when the user searches, then an empty state message appears with a suggestion to broaden the search.
- Given more than 20 results exist, then results are paginated with page controls visible.

**Form Submission and Validation:**
- Given all required fields are valid, when the user submits, then the record is saved and a success confirmation is shown.
- Given a required field is blank, when the user attempts to submit, then the form does not submit and an inline error appears adjacent to the field.
- Given an invalid data format (e.g., non-email string in email field), when the user submits, then a message explains the expected format.
- Given submission is in progress, then the submit button is disabled to prevent double-submission.

**Data Display and State:**
- Given data exists, when the user opens the list view, then items are sorted by [criterion] by default.
- Given data is loading, then a skeleton loading state is displayed instead of a blank area.
- Given a network error occurs, then a user-friendly error message is shown with a retry action.

## Bug Story Acceptance Criteria

Bug stories have a specific pattern. Always include the reproduction steps as the "Given/When" and the correct behavior as "Then":

```
Given [the exact conditions that trigger the bug]
When [the action that produces the incorrect behavior]
Then [the correct, expected behavior — not the current broken behavior]
```

Also add: "And the regression test covers this scenario" to ensure the fix is verified.

## Edge Case Coverage

Cover at minimum: the happy path, the primary error path, and permission/access boundary. For each story, ask:
- What happens with empty or no data?
- What happens at the maximum data limit?
- What happens when the user lacks permission?
- What happens when the network is slow or fails?
- What happens if the user submits twice?

Not every edge case needs to be an acceptance criterion — some belong in a QA test plan. Acceptance criteria should cover the edge cases that the product owner must personally verify.

## Definition of Done vs Acceptance Criteria

**Acceptance criteria** are story-specific: they define what this particular story achieves. They vary per story.

**Definition of Done** is team-wide: it defines the quality gates all stories must pass — code review completed, unit tests written, deployed to staging, no new lint errors, documentation updated if applicable.

Both must be fully satisfied before a story can be marked complete. Failing one but passing the other is not done.

## Verifiability Checklist

For each acceptance criterion, confirm:
- Can a tester determine pass/fail without interpretation or judgment?
- Does it describe observable behaviour, not internal implementation?
- Is it unambiguous? Replace "fast," "easy," "appropriate" with measurable thresholds.
- Could two different people read it and agree on what it means?
- Is it scoped to this story, or does it describe work that belongs elsewhere?
