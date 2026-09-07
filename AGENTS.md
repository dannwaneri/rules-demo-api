# AGENTS.md

Guidance for AI coding agents working in this repository.

## Rules

1. **Never log request headers or bodies.** They may contain secrets, tokens, or PII. Use structured logging that redacts these fields, or don't log the request at all.
2. All new API routes must validate input with a schema before processing. Never trust raw `request.json()` output directly.
3. Do not add new dependencies without a comment in `package.json` explaining why they're needed.
4. All new route paths must be kebab-case (e.g., `/feedback-summary`), never camelCase (e.g., `/feedbackSummary`). This is an internal convention, not a general best practice — enforced for consistency across services.
