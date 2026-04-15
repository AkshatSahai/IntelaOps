# /new-artifact-type

Adds a new artifact type to the Operations Co-Pilot platform.

## Steps

1. Add the new artifact type ID to the `ArtifactType` union in `src/lib/types.ts`
2. Add the artifact type to the relevant role's `artifactTypes` array in `src/lib/constants.ts`
3. Add guided prompts for all 6 phases to `src/prompts/guided/index.ts` under `GUIDED_PROMPTS`
4. Create a knowledge base file in `knowledge-base/<role>/` with best practices for this artifact type
5. Run `npx tsc --noEmit` to confirm no type errors
6. Run `npm run build` to verify the build passes

## Artifact Type ID Convention

Use kebab-case. Examples: `user-story`, `business-requirements-document`, `gap-analysis`

## Phase Prompts Required

For each artifact type, provide prompts for all 6 phases:
- `intro` — opening question to start the guided conversation
- `discovery` — open-ended questions to understand context
- `clarification` — targeted questions to resolve ambiguity
- `validation` — summary check before generation
- `generation` — trigger phrase (content is built from conversation context)
- `review` — post-generation refinement suggestions
