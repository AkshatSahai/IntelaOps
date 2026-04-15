# Requirements Elicitation

## What Elicitation Is

Requirements elicitation is the process of discovering, surfacing, and documenting what stakeholders need from a solution — not just what they say they want. The distinction matters: stakeholders often describe solutions rather than needs, confuse current-state problems with future-state requirements, and omit requirements so obvious to them they don't think to mention them.

Effective elicitation is 80% listening and facilitation, 20% writing. The BA's job is to ask the right questions, recognize when an answer is a symptom rather than a root cause, and probe until the underlying need is clear.

## Stakeholder Interviews

**Best for:** Deep understanding of individual perspectives, sensitive topics, senior stakeholders who won't speak freely in groups.

**Preparation:**
- Review any existing documentation before the interview
- Prepare open-ended questions (avoid yes/no)
- Prepare context-setting questions to warm up, then funnel toward specifics

**Effective question types:**
- *Current-state:* "Walk me through how you handle [process] today."
- *Pain point:* "What's the most frustrating part of that process?"
- *Ideal-state:* "If the problem were completely solved, what would that look like?"
- *Priority:* "If you could only fix one thing, what would it be?"
- *Edge case:* "What happens when [exception] occurs?"

**Pitfall:** Stakeholders answer the question they wish you asked. When an answer doesn't match the question, note both — the mismatch is often the most important signal.

## Facilitated Workshops

**Best for:** Reaching consensus across multiple stakeholders, resolving conflicting requirements, defining scope boundaries, process mapping.

**Workshop types:**
- *Requirements workshop:* Structured group elicitation of business needs
- *JAD session (Joint Application Design):* Collaborative design between business and IT
- *Retrospective/root cause:* Post-incident requirements discovery

**Facilitation tips:**
- Assign a scribe separate from the facilitator
- Use a parking lot for important off-topic items
- Use dot voting or MoSCoW to reach consensus on priorities
- End every workshop with confirmed next steps and owners

**Pitfall:** Vocal stakeholders dominate workshops. Use techniques like silent brainstorming (write before share), round-robin contribution, and anonymous voting to surface quieter perspectives.

## Observation (Shadowing / Job Shadowing)

**Best for:** Processes where people can't accurately describe what they do, discovering undocumented workarounds, process compliance gaps.

Observe the current-state process in action. Note what actually happens vs. what documentation says should happen. Users often have informal workarounds that represent hidden requirements ("I always export to Excel because the system doesn't let me filter by date").

**Output:** Annotated process notes, list of workarounds, gaps between documented and actual process.

## Document Analysis

**Best for:** Regulatory requirements, existing system integration, replacing legacy systems, compliance contexts.

Review existing documentation: current SOPs, system manuals, compliance frameworks, previous BRDs, audit findings. Document analysis surfaces constraints and obligations that no individual stakeholder will think to mention.

**Pitfall:** Documents go stale. Always verify documented processes against actual practice.

## Prototyping

**Best for:** UI-intensive systems, early discovery, stakeholders who struggle to articulate requirements in the abstract.

Low-fidelity wireframes (paper or tools like Figma) allow stakeholders to react to something concrete. Prototypes surface requirements that no interview or document would reveal: "Oh, but I also need to see the history of changes here." "What happens if I don't fill this field in?"

Prototyping is an elicitation tool, not a design deliverable. Make this explicit — a prototype is not a commitment to the UI.

## Survey and Questionnaire

**Best for:** Large stakeholder populations, quantitative data gathering, validating assumptions from other techniques.

Use surveys to gather breadth when interviews can only provide depth. Surveys confirm whether a finding from five interviews is representative of the broader population.

**Pitfall:** Survey questions require careful design to avoid leading responses. Pilot with 2–3 stakeholders before distributing widely.

## Choosing the Right Technique

| Situation | Recommended Technique |
|-----------|----------------------|
| Understanding a complex existing process | Observation + Interviews |
| Resolving conflicting stakeholder views | Facilitated Workshop |
| Large, distributed stakeholder group | Survey |
| Unclear UI requirements | Prototyping |
| Regulatory / compliance context | Document Analysis |
| Senior executive engagement | Interview |

In practice, combine techniques: start with document analysis, conduct 3–5 interviews, run a workshop to validate and resolve gaps, then prototype the most ambiguous areas.

## Validating Requirements

After elicitation, validate requirements with stakeholders through structured walkthroughs. Ask: "Does this accurately represent what you need?" "Have we missed anything?" "Are there scenarios not covered here?" Validation is not sign-off — it is a confirmation of shared understanding before formalization.
