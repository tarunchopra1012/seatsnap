# SeatSnap Learning Log

Each entry: **what was missing → technique added → benefit → metric before/after.**

---

## Stage 1 — Naive MVP

**Goal:** get the happy path working end to end inside Docker.

**Decisions**

- **Monorepo** (`apps/api`, `apps/web`): one clone, one `docker compose up`, and API and UI changes ship in the same commit. Each app still has its own `package.json` and Dockerfile, so they could be split later.
- **Embedded seats**: seats live inside the event document, so one read returns the full seat map. (We'll revisit this trade-off in Stage 5.)
- **Express 4** on purpose: its handling of async errors is part of the Stage 2 lessons.

**Concepts introduced**

- Docker Compose service networking, healthchecks, bind mounts
- Mongoose schemas, subdocuments, `timestamps`
- Vite dev proxy

**Metric baseline:** happy-path flows working — list, view seat map, book, create event.

### 🐞 Bug hunt (before Stage 2)

This version has **at least 8 deliberate weaknesses** across the API and the UI — crashes, bad data getting in, wasted bandwidth, and one serious correctness bug that only appears under load. Try to find as many as you can by poking the app and the API (curl, Postman, or two browser tabs). Note them below; in Stage 2 we'll write tests that prove each one.

| #   | What I found | How I triggered it |
| --- | ------------ | ------------------ |
| 1   |              |                    |
| 2   |              |                    |
| 3   |              |                    |

---

## Stage 2 — Break it

_(coming next)_
