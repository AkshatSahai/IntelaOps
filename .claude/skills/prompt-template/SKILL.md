# Skill: Prompt Template

Creates or updates LLM prompt templates in `src/prompts/`.

## When to Use

When adding prompts for a new artifact type, role, or conversation phase.

## File Locations

- `src/prompts/system/index.ts` — system prompts per role
- `src/prompts/guided/index.ts` — phase prompts per artifact type
- `src/prompts/advisory/index.ts` — advisory mode prompts

## Rules

1. No prompts in components or services — all prompts live in `src/prompts/`
2. Prompts are exported constants or functions, never inline strings
3. Use template literals for multi-line prompts
4. Include RAG context injection points (marked with `${ragContext}`)
5. Phase prompts must cover all 6 phases: intro, discovery, clarification, validation, generation, review

## Prompt Quality Guidelines

- Be specific about the agent's role and expertise
- Specify the tone (coaching, professional, concise)
- Include examples of what good output looks like
- State what the agent should NOT do
- Include the "knowledge base context" variable for RAG grounding

## Testing a New Prompt

After writing the prompt:
1. Call the `/api/chat` endpoint manually with a test message
2. Verify the response matches the expected behaviour
3. Check that the agent asks questions rather than immediately generating (in discovery phase)
