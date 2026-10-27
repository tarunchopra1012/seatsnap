# SeatSnap

An event seat-booking platform built on the MERN stack, grown stage by stage from a naive MVP into a production-grade, real-time system. See `LEARNING_LOG.md` for what each stage added and why.

**Current stage: 1 — Naive MVP** (works on the happy path; contains deliberate shortcuts we'll expose in Stage 2)

## Run it

Requires Docker Desktop. Nothing else needs to be installed on your machine.

```bash
docker compose up --build          # start mongo, api and web
docker compose exec api npm run seed   # in a second terminal: load 3 sample events
```

- Web app: http://localhost:5173
- API: http://localhost:4000/api/health
- MongoDB: mongodb://localhost:27017/seatsnap (connect with MongoDB Compass to explore the data)

Useful commands:

```bash
docker compose logs -f api         # follow API logs
docker compose down                # stop everything (data is kept)
docker compose down -v             # stop and wipe the database volume
docker compose exec mongo mongosh seatsnap   # open a Mongo shell
```

## Structure

```
seatsnap/
├── docker-compose.yml      # mongo + api + web, one command to start
├── apps/
│   ├── api/                # Express + Mongoose (Node 22)
│   │   └── src/
│   │       ├── index.js        # app setup and DB connection
│   │       ├── models/Event.js # event with embedded seats
│   │       ├── routes/events.js
│   │       └── seed.js
│   └── web/                # React + Vite
│       └── src/
│           ├── App.jsx
│           └── components/  # EventList, EventDetail (seat map), CreateEvent
└── LEARNING_LOG.md
```

## API (Stage 1)

| Method | Path                   | Body                                                        |
| ------ | ---------------------- | ----------------------------------------------------------- |
| GET    | `/api/events`          |                                                             |
| GET    | `/api/events/:id`      |                                                             |
| POST   | `/api/events`          | `title, description, venue, date, price, rows, seatsPerRow` |
| POST   | `/api/events/:id/book` | `seatLabel, name`                                           |

## How Docker is set up

- Each app has its own `Dockerfile`; `docker-compose.yml` wires them together on a private network where services reach each other by name (`mongo`, `api`).
- The web dev server proxies `/api` to `http://api:4000`, so the browser never deals with CORS or hard-coded hosts.
- Source folders are bind-mounted, so editing code reloads the containers live. `node_modules` lives inside the containers only.
- The API waits for MongoDB's healthcheck before starting.
- This is a development setup. Production images (multi-stage builds, Nginx for static files) arrive in Stage 8.
