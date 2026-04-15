# Operations Co-Pilot

## What This Is

AI-powered platform for product, strategy, and delivery roles.

Two modes: Guided Work Item Creation (structured conversation producing artifacts)
and Advisory Agent (conversational mentoring with no artifact output).

MVP roles: Product Owner, Business Analyst.

## Tech Stack

- Framework: Next.js 14 (App Router, Server Components, Server Actions)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS + shadcn/ui
- Database: Supabase (PostgreSQL + pgvector + Auth + RLS)
- LLM: Anthropic Claude Sonnet via @anthropic-ai/sdk
- Hosting: Vercel
- Embedding: OpenAI text-embedding-3-small (for RAG)

## Key Directories

- src/app/ — Next.js pages and API routes
- src/components/ — React components (ui/ for primitives, chat/ for chat UI)
- src/services/ — Business logic (agent.ts is the orchestrator)
- src/prompts/ — All LLM prompt templates organized by role and mode
- supabase/migrations/ — Database schema (run in order)
- knowledge-base/ — RAG content organized by role
- .claude/skills/ — Claude Code skills for this project

## Code Standards

- TypeScript everywhere. No any types. Use strict mode.
- Functional components with hooks only. No class components.
- Use ES modules (import/export). No require().
- Use async/await. No .then() chains.
- All API routes return typed responses using lib/types.ts interfaces.
- Components use Tailwind only. No inline styles. No CSS modules.
- Files under 300 lines. If longer, split into smaller modules.

## Commands

- Dev server: npm run dev
- Build: npm run build
- Lint: npm run lint
- Type check: npx tsc --noEmit
- Test: npm run test
- DB migrations: npx supabase db push
- Ingest knowledge base: npx tsx knowledge-base/ingest.ts

## Patterns

- Supabase client: use lib/supabase/server.ts in Server Components and API routes.
  Use lib/supabase/client.ts only in Client Components.
- Streaming: API route /api/chat uses ReadableStream for agent responses.
- RAG: services/rag.ts handles embedding queries and searching pgvector.
  Always retrieve context BEFORE generating any artifact section.
- Sessions: Every conversation is a session. Session state stored in Supabase.

## Design System

If a DESIGN.md file exists at the project root, read it before writing any
component or applying any Tailwind classes. It defines the visual language for the app.

## Do NOT

- Do not use localStorage for state. Use Supabase.
- Do not hardcode prompts in components. All prompts live in src/prompts/.
- Do not skip TypeScript types. Every function has typed params and return.
- Do not commit .env.local or any API keys.
- Do not use default exports except for Next.js pages.
