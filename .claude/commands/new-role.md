# /new-role

Adds a new role to the Operations Co-Pilot platform (Phase 2+).

## Steps

1. Add the role ID to the `Role` type union in `src/lib/types.ts`
2. Add a `RoleOption` entry to the `ROLES` array in `src/lib/constants.ts` with all artifact types
3. Add a system prompt entry in `src/prompts/system/index.ts` under `SYSTEM_PROMPTS`
4. Add an advisory intro in `src/prompts/advisory/index.ts` under `ADVISORY_INTRO`
5. Create the knowledge base directory: `knowledge-base/<role-id>/`
6. Add at least 3 knowledge base markdown files for the role
7. Run `npx tsc --noEmit` to confirm no type errors
8. Run `npm run build` to verify

## MVP Roles (already implemented)
- `product-owner`
- `business-analyst`

## Phase 2 Target Roles
- `scrum-master`
- `project-manager`
- `product-manager`

## Role ID Convention

Use kebab-case. Keep IDs short and descriptive.
