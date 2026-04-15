# Communication Frameworks for Product and BA Roles

## Why Communication Frameworks Matter

Product owners and business analysts succeed or fail on communication. Technical accuracy is necessary but insufficient. The ability to frame, structure, and adapt communication to different audiences is what makes the difference between a requirement that gets built correctly and one that gets misunderstood.

## Pyramid Principle (Minto)

Structure communication with the conclusion first, then supporting arguments.

**SCQA Framework:**
- **Situation**: What is the context everyone agrees on?
- **Complication**: What has changed or what problem has emerged?
- **Question**: What does this make the audience wonder?
- **Answer**: Your recommendation or finding (lead with this in written communication)

Use this structure for: status reports, recommendations to leadership, BRD executive summaries, feature proposals.

**Anti-pattern**: Burying the recommendation at the end after extensive preamble. Executives read the first paragraph; if your conclusion isn't there, it won't land.

## Stakeholder Communication Matrix

Tailor your message to the audience:

| Audience | Language | Level of Detail | Format | Frequency |
|----------|----------|----------------|--------|-----------|
| Executive/Sponsor | Business outcomes, ROI, risk | High-level | 1-page brief, dashboard | Monthly/milestone |
| Business stakeholder | Process, value, timelines | Medium | Status update, demo | Fortnightly |
| Developer/QA | Functional detail, acceptance criteria | High | Story, spec, diagram | Sprint-by-sprint |
| End user | What changes for them, how to use it | Low-technical | Training guide, demo | At delivery |

## RACI for Communication

Define who receives what communication:
- **Accountable**: Must be consulted before decisions; their sign-off is required
- **Consulted**: Input requested; two-way dialogue
- **Informed**: Updates sent; one-way; no response required

Over-communicating (CCing everyone on everything) is as harmful as under-communicating — it trains people to ignore your messages.

## Managing Up — Communicating with Leadership

Key principles:
1. **Lead with impact**: "We have a risk that could delay launch by 3 weeks" before the detail
2. **Bring options**: Never just present a problem — present 2–3 options with trade-offs
3. **Quantify when possible**: "This affects 2,000 users daily" beats "this affects a lot of users"
4. **Be brief**: A 2-minute verbal update is better than a 20-slide deck for routine matters
5. **Signal early**: Leaders hate surprises. Share bad news as soon as you know it.

## Conflict Resolution Frameworks

### Interest-Based Negotiation
Focus on interests (why someone wants something), not positions (what they say they want). Two stakeholders who both say "we want ownership of this data" may actually both want the same thing — reliable access — and ownership is just their proposed solution.

**Steps:**
1. Separate people from the problem
2. Focus on interests, not positions
3. Generate options for mutual gain
4. Use objective criteria to evaluate options

### Escalation Path
When stakeholder conflicts can't be resolved at the working level:
1. Direct conversation between conflicting parties (facilitated by BA/PO)
2. Escalate to shared manager with a summary of positions and proposed resolution
3. Programme board / steering committee decision
4. Document the decision and its rationale regardless of outcome

## Writing for Clarity

Techniques for unambiguous requirements writing:
- **Active voice**: "The system sends a confirmation email" not "A confirmation email is sent by the system"
- **Specific verbs**: "displays", "calculates", "stores" not "handles", "manages", "processes"
- **Avoid double negatives**: "must not fail to notify" → "must notify"
- **Define jargon**: Every domain has its own vocabulary. Define terms in a glossary.
- **One sentence, one requirement**: If a sentence contains "and" or "or", consider splitting it
