# Process Mapping Standards

## Why Process Maps Matter

Process maps make invisible work visible. They reveal handoffs, decision points, bottlenecks, and rework loops that no one has documented — or even consciously noticed. A BA's process map is often the first time an organisation sees its own processes clearly.

## Types of Process Maps

### Swimlane Diagram (Cross-Functional Flowchart)
Best for: Showing who does what and where handoffs occur.
- Each row = one actor (person, team, or system)
- Flow moves between lanes at handoff points
- Highlights accountability and interface points

### Value Stream Map
Best for: Identifying waste and improvement opportunities.
- Shows time spent in each step vs waiting time
- Distinguishes value-adding from non-value-adding activities
- Common in Lean / manufacturing-influenced contexts

### BPMN (Business Process Model and Notation)
Best for: Formal, unambiguous process documentation for technical audiences.
- Standardised notation (events, activities, gateways, flows)
- Suitable for process automation and system design
- Steep learning curve — use only where formality is required

### Simple Flowchart
Best for: Quick documentation, stakeholder walkthroughs.
- Shapes: rectangle (process step), diamond (decision), parallelogram (input/output), oval (start/end)
- Appropriate for most BA documentation

## Process Map Best Practices

### Before You Map
1. Define the scope: what triggers the process (start event) and what ends it (end event)?
2. Identify all actors involved — people and systems
3. Walk the process yourself or observe it before mapping

### While You Map
- Map the **as-is** process first (current state), even if it's messy
- Use present-tense verbs: "Receive order", "Approve request", not "Order is received"
- Every decision diamond must have at least 2 labelled paths
- Label all arrows between swimlanes
- Note system names next to automated steps

### After You Map
- Walk through the map with process owners to validate
- Identify: bottlenecks (where does work queue up?), rework loops (where does work come back?), handoff failures (where do things get lost?)
- Create the **to-be** process map showing the improved state
- Document the delta between as-is and to-be as requirements

## Swimlane Template Structure

```
[Trigger Event] → [Step 1: Actor A] → [Handoff] → [Step 2: Actor B]
                                           ↓
                                     [Decision?]
                                    Yes ↓    No →  [Alternative path]
                                    [Step 3]
                                       ↓
                                  [End Event]
```

## Notation Standards for Text-Based Process Maps

When producing textual process maps (as this tool does), use:

- **→** for sequential flow
- **[Actor]** for responsibility
- **<Decision>** for gateways
- **//if yes//** and **//if no//** for branches
- **[System]** for automated steps
- **(waiting)** for delays or queues

## Common Process Mapping Mistakes

- Mapping the "ideal" process instead of what actually happens
- Missing exception/error paths
- Too much detail (individual keystrokes) or too little (skipping key steps)
- Not showing which steps are manual vs automated
- Assuming every swimlane actor sees the same information
