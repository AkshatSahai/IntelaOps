# Operations Co-Pilot — MVP Plan

## Vision

An AI-powered co-pilot for the people who define, prioritise, and deliver software products.
Not a form filler. Not a template engine. A genuine thought partner that asks smart questions,
surfaces blind spots, and produces high-quality artifacts — grounded in current methodology
through a RAG pipeline.

## Two Core Modes

### 1. Guided Work Item Creation

The user selects their role and an artifact type. The agent conducts a structured
conversation across six phases:

| Phase | What Happens |
|-------|-------------|
| Intro | Agent confirms artifact type, explains the conversation |
| Discovery | Open-ended questions to understand context and users |
| Clarification | Targeted follow-ups to resolve ambiguity and edge cases |
| Validation | Agent summarises understanding; user confirms or corrects |
| Generation | Agent produces the complete, formatted artifact |
| Review | Agent offers refinement suggestions; user can iterate |

The conversation is NOT a form. Questions adapt based on what the user has said.
The RAG pipeline retrieves relevant best-practice content before each response.

### 2. Advisory Agent Mode

The user describes a challenge. The agent helps them reason through it using
relevant frameworks (WSJF, MoSCoW, stakeholder analysis, etc.) and coaching techniques.
No artifact is generated unless explicitly requested.

## MVP Scope

### Included

| Role | Artifacts |
|------|-----------|
| Product Owner | User Story, Bug (User Story format), Epic, Sprint Goal, Acceptance Criteria, Backlog Refinement Notes |
| Business Analyst | BRD, Functional Specification, Use Case, Process Map, Gap Analysis, Stakeholder Analysis |

Both roles support Advisory Mode.

### Excluded (Phase 2)

- Scrum Master role
- Project Manager role
- Product Manager role
- Team collaboration features (single-user MVP)
- Export to Jira / Confluence / ADO
- Artifact templates library
- Analytics dashboard

## Technical Architecture

```
User → Next.js App (Vercel)
         ↓
    /api/chat route (streaming)
         ↓
    services/agent.ts (orchestrator)
         ↓          ↓
  RAG retrieval   Anthropic Claude
  (pgvector)      (response streaming)
         ↓          ↓
    Supabase      ReadableStream
    (messages,    → client
     sessions,
     artifacts)
```

## Database Schema

| Table | Purpose |
|-------|---------|
| user_profiles | Extends auth.users; stores role and display name |
| sessions | One row per conversation; tracks mode, role, phase |
| messages | All chat messages per session |
| artifacts | Generated artifacts with versioning |
| knowledge_items | RAG content with pgvector embeddings |

## Milestones

### Session 0 (this session) ✅
- Project scaffold
- All directories and placeholder files
- Build passes

### Session 1 — Authentication
- Supabase Auth (email/password)
- Login and register pages
- Protected routes via middleware
- User profile creation on sign-up

### Session 2 — Session Management
- Create/list sessions
- Connect Supabase CRUD
- Session history page

### Session 3 — Guided Flow
- Full guided conversation (all 6 phases)
- Phase detection and advancement
- Artifact generation and display

### Session 4 — RAG Pipeline
- Knowledge base ingestion (ingest.ts)
- pgvector search connected to agent
- Context injection in every response

### Session 5 — Advisory Mode
- Framework detection
- Advisory conversation flow
- Transition to guided mode on request

### Session 6 — Polish + Launch
- Design system applied (DESIGN.md)
- Error handling, loading states
- Vercel deployment
- End-to-end testing
