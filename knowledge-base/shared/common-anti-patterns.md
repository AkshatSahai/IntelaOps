# Common Anti-Patterns in Product and BA Work

## What Is an Anti-Pattern?

An anti-pattern is a commonly occurring solution to a recurring problem that seems reasonable but produces bad results. Recognising them is the first step to avoiding them.

---

## Requirements Anti-Patterns

### 1. Gold-Plating
**What it looks like**: Adding features, polish, or complexity beyond what was requested or needed.
**Why it happens**: Developers want to do good work; stakeholders keep adding scope; no one enforces boundaries.
**Consequence**: Wasted effort, delayed delivery, maintenance burden.
**Fix**: Tie every feature to a defined user need. If you can't articulate the user who benefits, challenge whether it's needed.

### 2. Analysis Paralysis
**What it looks like**: The team keeps analysing, refining, and asking questions instead of starting to build.
**Why it happens**: Fear of being wrong, unclear decision authority, perfectionism.
**Consequence**: Nothing gets delivered; opportunity is missed.
**Fix**: Use timeboxed discovery. Decide on enough requirements to start, and plan to learn the rest by doing.

### 3. Requirements as a Contract
**What it looks like**: Requirements documents treated as fixed, immutable, legally binding specs.
**Why it happens**: Waterfall heritage; blame culture; procurement practices.
**Consequence**: Change requests become expensive and political; teams build what was specified, not what's needed.
**Fix**: Use requirements as conversation starters. Build in explicit change review cycles.

### 4. Requirements by Assumption
**What it looks like**: Writing requirements without talking to users or stakeholders — assuming you know what they need.
**Why it happens**: Time pressure, inaccessible users, overconfidence.
**Consequence**: Building the wrong thing; expensive rework.
**Fix**: Always validate with at least 3 representative users before committing to a solution.

---

## Product Ownership Anti-Patterns

### 5. The Absentee Product Owner
**What it looks like**: PO is never available for questions, never attends refinement, shows up only at sprint review to say "that's not what I wanted."
**Why it happens**: PO role not properly resourced; PO doing other jobs simultaneously.
**Consequence**: Teams make assumptions that are frequently wrong; low confidence and morale.
**Fix**: Product ownership is a full-time role. If it isn't, the product will suffer proportionally.

### 6. The Feature Factory
**What it looks like**: Output measured by number of features shipped, not outcomes achieved. Backlog is an infinite feature queue.
**Why it happens**: Stakeholder pressure; lack of outcome-based metrics; roadmaps committed too far in advance.
**Consequence**: Teams build a lot but deliver little value; technical debt accumulates.
**Fix**: Define success in outcome terms (retention, task completion, revenue) before writing stories. Regularly sunset features that aren't delivering.

### 7. Stakeholder-Driven Backlog
**What it looks like**: Loudest/most senior stakeholder drives backlog order, regardless of user value or strategic alignment.
**Why it happens**: Weak PO authority; no objective prioritisation framework; fear of conflict.
**Consequence**: Team works on the wrong things; strategic initiatives get crowded out.
**Fix**: Use an explicit, transparent prioritisation framework (WSJF, MoSCoW). Make trade-offs visible.

---

## Agile Process Anti-Patterns

### 8. Zombie Scrum
**What it looks like**: The team goes through Scrum ceremonies mechanically with no energy, no improvement, no real collaboration.
**Why it happens**: Scrum imposed top-down; no psychological safety; no real retrospective action.
**Consequence**: Scrum overhead without benefit; team disengagement.
**Fix**: Retrospectives must produce real actions that are followed up on. If they don't, the team has lost faith in the process.

### 9. Sprint Planning Theatre
**What it looks like**: Stories are estimated in planning, but the real work is unknown until mid-sprint. Estimates are fiction.
**Why it happens**: Stories not refined before planning; team doesn't feel safe saying "we don't understand this."
**Consequence**: Sprint goals are regularly missed; planning loses credibility.
**Fix**: Nothing should enter sprint planning that isn't INVEST-compliant and has acceptance criteria.

### 10. Velocity Obsession
**What it looks like**: Leadership tracks velocity as the primary measure of team performance. Teams game it.
**Why it happens**: Desire for predictability; misunderstanding of velocity's purpose.
**Consequence**: Story point inflation; pressure to avoid difficult work; metrics divorced from outcomes.
**Fix**: Velocity is a planning tool for the team, not a management metric. Measure outcomes (features delivered, bugs fixed, user satisfaction) instead.

---

## Communication Anti-Patterns

### 11. The HIPPO Effect
**What it looks like**: Decisions made based on the Highest Paid Person's Opinion, regardless of evidence.
**Consequence**: Teams stop gathering data; culture of deference over insight.
**Fix**: Establish data-driven decision practices. Present evidence before preferences.

### 12. Meeting Instead of Document
**What it looks like**: Complex decisions made verbally in meetings, with no written record. Attendees remember different things.
**Consequence**: Rework, disputes, inconsistency.
**Fix**: All decisions of consequence must be documented and shared within 24 hours of the meeting.
