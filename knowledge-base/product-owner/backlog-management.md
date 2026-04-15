# Backlog Management

## What a Healthy Backlog Looks Like

A healthy product backlog is a living artifact, not a static list. It contains work at multiple levels of detail: near-term items are small, well-defined, and sprint-ready; mid-term items are sized but not yet fully refined; far-term items may be epics or placeholders. The top of the backlog is clean and actionable; the bottom is intentionally rough.

A healthy backlog is also finite and curated. A backlog with 400+ items that nobody reviews is a false comfort — it creates an illusion of completeness while hiding real gaps and obsolete ideas.

## Definition of Ready

A story is "ready" for sprint planning when it meets all of the following conditions:

1. **Written in user story format** with a clear "so that" clause
2. **INVEST criteria met** — independent, estimable, small, testable
3. **Acceptance criteria defined** — at least the happy path and primary error scenario
4. **Dependencies identified** — known blockers are surfaced and either resolved or accepted
5. **Design complete** (where applicable) — UI mockups or wireframes reviewed and approved
6. **Estimate agreed** — team has provided a relative size estimate in planning poker

Stories that don't meet the Definition of Ready should not enter a sprint. The cost of pulling in a not-ready story is higher than the cost of having spare capacity and pulling in a smaller ready story.

## Refinement Cadence

Backlog refinement (grooming) should be a regular, time-boxed ceremony — typically once per sprint, targeting stories for the next one or two sprints. The goal is to ensure the top 10–15 items in the backlog are always sprint-ready.

**Refinement agenda:**
1. Review any stories that moved to the top since the last session
2. Walk through acceptance criteria and answer open questions
3. Break down large stories that are approaching the planning horizon
4. Estimate new stories using planning poker
5. Remove stories that have become obsolete or deprioritized

Refinement should not exceed 10% of the team's total sprint capacity (about 4 hours for a two-week sprint). If refinement takes longer, the backlog is too large or requirements are too unstable.

## Backlog Hygiene

**Triage new requests immediately.** Every new item that enters the backlog should be triaged within one business day: is this worth keeping? If yes, assign it to a rough priority bucket (now, next, later). If no, close it with a note explaining why.

**Set expiry dates on speculative items.** If a story hasn't been refined or prioritized in 90 days, archive it. Ideas that are genuinely valuable resurface; ideas that disappear when archived were never a priority.

**Merge duplicates aggressively.** Duplicate stories fragment discussion and create confusion about what was actually built. When in doubt, merge and link.

**Separate bugs from features.** Bugs are often pushed down the backlog indefinitely. Maintain a separate bug queue with its own prioritization rules — severity and frequency should drive bug priority, not stakeholder relationships.

## Prioritization within the Backlog

The backlog is ordered, not just categorized. Every item has exactly one position. Use a prioritization framework (RICE, MoSCoW, WSJF) consistently to justify ordering, especially when items are competing for the same sprint.

Apply a time horizon lens to the top of the backlog:
- **Now (next 1-2 sprints):** Sprint-ready, estimated, accepted by team
- **Next (next quarter):** Sized, refined enough for effort estimation
- **Later (beyond the quarter):** Described, not yet detailed

Items in "Later" should not be detailed extensively — requirements change, and over-specifying far-future items wastes effort.

## Triage Techniques

**Impact vs. Effort matrix**: Quick visual for stakeholder workshops. Plot items on a 2×2 with impact (high/low) on Y and effort (high/low) on X. High impact, low effort = do immediately. Low impact, high effort = do not do.

**Now/Next/Later roadmap**: Stakeholder-friendly alternative to a prioritized list. Communicates sequencing without committing to dates.

**Weighted voting**: Give stakeholders a fixed number of votes and ask them to allocate across items. Surfaces consensus priorities and reduces HiPPO dynamics.

## Backlog Review Meetings

A monthly backlog review with key stakeholders (not the full refinement session) keeps the backlog aligned with business priorities. Agenda: review the top 15 items, confirm they still reflect current priorities, surface any new work that needs to be inserted, and retire any items whose time has passed. Keep it to 60 minutes.
