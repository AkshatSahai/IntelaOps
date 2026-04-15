# Sprint Goal Writing

## What a Sprint Goal Is

A sprint goal is a single objective for the sprint that provides focus and coherence. It's the answer to "Why are we doing this sprint?" — not a list of stories, but a statement of the business outcome the team is working toward.

The sprint goal is set during Sprint Planning and should be agreed upon by the Scrum Team.

## Characteristics of a Good Sprint Goal

- **Single focus**: One clear objective, not a collection of unrelated items
- **Outcome-oriented**: Describes business/user value, not tasks
- **Achievable**: The team can realistically accomplish it in the sprint
- **Inspectable**: At Sprint Review, you can clearly say whether it was achieved
- **Flexible**: The team can adjust the implementation (stories/tasks) as long as the goal is met

## Format Options

**Option 1 — Outcome + Scope:**
> "Enable [users/persona] to [capability] so that [business value]."

**Option 2 — Problem framing:**
> "Solve [problem] for [users] by [approach]."

**Option 3 — Milestone framing:**
> "Complete [meaningful milestone] that allows [next step or stakeholder action]."

## Examples

**Weak (list of tasks):**
> "Complete user authentication, fix 3 bugs, and refactor the database layer."

**Strong (outcome):**
> "Enable new users to register, verify their email, and log in, so we can begin beta onboarding."

---

**Weak (vague):**
> "Improve performance."

**Strong (specific outcome):**
> "Reduce checkout page load time below 2 seconds so users on mobile can complete purchases without drop-off."

---

**Weak (technical):**
> "Migrate from REST to GraphQL."

**Strong (value):**
> "Give the mobile team the GraphQL API they need to build the new dashboard without the current latency issues."

## When Stories Don't Fit the Goal

It's acceptable and common to bring a few "baggage" stories into the sprint that don't relate to the sprint goal — minor bug fixes, tech debt, etc. Be transparent about this. The sprint goal applies to the primary work; not every story must map to it.

## Sprint Goal at Sprint Review

At the end of the sprint, assess: was the sprint goal achieved? This is a yes/no question. It's separate from the velocity calculation and story completion rate.

If the goal wasn't achieved, include a retrospective item: Was the goal realistic? Did impediments block it? Was scope pulled in that derailed it?

## Common Mistakes

- Listing stories as the goal ("Complete US-101, US-102, and US-103")
- Making the goal so vague it's always achievable ("Deliver value to users")
- Setting a goal for every story independently — defeating the purpose of having one shared goal
- Not referencing the sprint goal when scope-change requests arise mid-sprint
