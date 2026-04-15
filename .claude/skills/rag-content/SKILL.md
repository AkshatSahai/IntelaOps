# Skill: RAG Content

Creates high-quality knowledge base content for the RAG pipeline.

## File Locations

```
knowledge-base/
├── product-owner/    — PO-specific best practices
├── business-analyst/ — BA-specific methodology
└── shared/           — Role-agnostic agile/communication content
```

## Content Quality Standards

Each markdown file should:
- Cover one topic thoroughly (300–800 words)
- Use real frameworks with names and structure (not generic advice)
- Include concrete examples, templates, or checklists
- Cite common mistakes or anti-patterns where relevant
- Be chunked naturally (headings mark logical breaks — keep related content together)

## Chunking Considerations

The ingest script chunks at ~512 tokens. Structure content so that each heading section is self-contained and meaningful without surrounding context. Avoid headings that only make sense with the previous section.

## After Adding Content

1. Run the ingest script: `npx tsx knowledge-base/ingest.ts`
2. Test retrieval: query the `/api/rag` endpoint with a relevant question
3. Verify the content appears in results with reasonable similarity scores

## Format Template

```markdown
# [Topic Name]

## [Section 1 — clear heading]

[Content — self-contained, ~200 words]

## [Section 2]

[Content]

## [Practical tip / example / template]

[Content]
```
