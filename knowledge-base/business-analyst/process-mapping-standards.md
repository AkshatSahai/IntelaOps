# Process Mapping Standards

## Purpose of Process Maps

Process maps document how work flows through a system — who does what, in what order, with what decisions and exceptions. They serve multiple purposes: discovering requirements hidden in the current-state process, aligning stakeholders on a shared understanding, identifying inefficiencies and pain points, and providing a baseline for measuring improvement after implementation.

A process map answers: What triggers the process? Who performs each activity? What decisions are made? What can go wrong? What does the process produce?

## When to Use Swim Lane Diagrams

Swim lane diagrams (also called cross-functional flowcharts) are the standard for business process mapping when multiple roles or departments are involved. Each lane represents one actor (person, role, team, or system). Activities sit in the lane of the actor responsible for performing them.

**Use swim lane diagrams when:**
- The process crosses organizational boundaries
- Handoffs between parties are a primary source of delay or error
- You need to show accountability clearly for compliance documentation
- You are mapping an as-is process to identify improvement opportunities

**Use a simple flowchart (single lane) when:**
- The process involves only one actor
- You are documenting a decision tree or branching logic
- You need a quick reference card, not a full analysis artifact

## Standard Notation

Use BPMN (Business Process Model and Notation) or a consistent internal notation. Key symbols:

| Symbol | Meaning |
|--------|---------|
| Rounded rectangle | Activity / Task |
| Diamond | Decision / Gateway (Yes/No or branching) |
| Circle (thin border) | Start event |
| Circle (thick border) | End event |
| Arrow | Sequence flow (direction of process) |
| Dashed arrow | Message flow (cross-boundary communication) |
| Document icon | Artifact / Output produced |

Consistency matters more than strict BPMN compliance. Use whichever symbols your audience recognizes, and include a legend.

## Swim Lane Layout Conventions

- **Left-to-right flow** is standard (time flows left to right)
- **Top-to-bottom lane order** should reflect authority or process initiation — the actor who triggers the process should be in the top lane
- **Label every lane** with the role, not the person's name
- **Label every decision diamond** with a question (e.g., "Approved?")
- **Label every flow arrow** out of a decision diamond with Yes/No or the branch condition
- **Keep lanes to six or fewer** — more than six lanes creates a diagram too wide to read. If you have more actors, consider splitting into a sub-process map.

## Annotating Pain Points

When mapping an as-is (current state) process, annotate pain points directly on the diagram using a consistent convention:

- **Lightning bolt icon (or red annotation):** High-friction activity, rework, or common error point
- **Clock icon (or orange annotation):** Significant wait time or delay
- **Question mark annotation:** Step that varies by individual — inconsistent execution
- **Document icon annotation:** Manual data re-entry or report generation that could be automated

For each annotation, add a note: the nature of the pain point, estimated frequency, and estimated business impact. These annotations drive the requirements for the future-state process.

## As-Is vs To-Be Maps

Always document the as-is process before designing the to-be. Teams that jump directly to the future state make incorrect assumptions about what currently exists and miss requirements hiding in current-state workarounds.

**As-is map:** Accurate reflection of current reality, including unofficial workarounds. Do not document how the process is supposed to work — document how it actually works. Use observation and interviews to verify against written SOPs.

**To-be map:** The target future state. Every difference from the as-is map represents a change that must be designed, built, tested, and adopted. The gap between as-is and to-be is the scope of the change.

## Process Map Review Checklist

Before finalizing a process map, verify:
- Every swim lane is labeled with a role (not a person)
- Every decision diamond has at least two labeled outgoing flows
- Every flow has a defined start event and at least one end event
- No activity is "floating" (every step connects to the next)
- Sub-processes are either fully expanded or clearly labeled as a collapsed sub-process
- Stakeholders who perform each lane have reviewed and confirmed accuracy
- Pain point annotations are documented in the associated requirements list

## Process Metrics to Capture

Alongside the map, record: average cycle time for the full process, average wait time at each handoff, error rate at each decision point, and volume (transactions per day/week). These metrics establish the baseline for measuring improvement after the solution is implemented.
