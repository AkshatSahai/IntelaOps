# /test-flow

End-to-end test of a guided creation or advisory session flow.

## Guided Flow Test

1. Start the dev server: `npm run dev`
2. Log in and select role "Product Owner"
3. Go to Create → User Story
4. Verify: intro message appears from the assistant
5. Type a brief answer and send
6. Verify: assistant asks a follow-up discovery question
7. Continue through 3 exchanges
8. Verify: conversation advances to clarification phase
9. Continue until generation phase
10. Verify: a formatted user story appears in the artifact preview
11. Verify: copy button works

## Advisory Flow Test

1. Log in and select role "Business Analyst"
2. Go to Advisor → Start new session
3. Type: "I have a stakeholder who keeps changing requirements after sign-off"
4. Verify: assistant asks a clarifying question (not an immediate solution)
5. Answer the question
6. Verify: assistant references a relevant framework (stakeholder analysis, conflict resolution)

## API-Level Test (without UI)

```bash
# Test chat endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "00000000-0000-0000-0000-000000000001",
    "message": "I want to write a user story for a checkout feature",
    "role": "product-owner",
    "mode": "guided",
    "artifactType": "user-story"
  }'
```

## RAG Test

```bash
curl -X POST http://localhost:3000/api/rag \
  -H "Content-Type: application/json" \
  -d '{
    "query": "how to write good acceptance criteria",
    "role": "product-owner",
    "limit": 3
  }'
```
