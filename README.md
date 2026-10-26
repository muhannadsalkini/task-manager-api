# Task Manager API

A small, layered REST API for creating and listing tasks, built with Express 5 and TypeScript, with request validation, centralized error handling, OpenAPI docs, integration tests and a Docker image.

## ✨ Features

- `POST /tasks` and `GET /tasks` endpoints backed by an in-memory store
- Input validation with `express-validator` (title is trimmed and must be non-empty)
- Centralized error handling via a custom `AppError` class and a global error middleware, so every error comes back as consistent JSON
- JSON 404 response for unknown routes
- Interactive Swagger UI (OpenAPI 3) at `/api-docs`
- Security and logging middleware: `helmet`, `cors`, `morgan`
- Integration tests with Jest + Supertest
- Multi-stage Dockerfile for a slim production image

## 🛠 Tech Stack

| Area | Tools |
| --- | --- |
| Runtime / Language | Node.js, TypeScript |
| Framework | Express 5 |
| Validation | express-validator |
| API docs | swagger-jsdoc, swagger-ui-express |
| Testing | Jest, ts-jest, Supertest |
| Tooling | nodemon, ts-node |
| Container | Docker (`node:18-alpine`) |

## 🚀 Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/muhannadsalkini/task-manager-api.git
cd task-manager-api
npm install
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with nodemon + ts-node (`src/server.ts`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled server (`dist/src/server.js`) |
| `npm test` | Run the Jest integration test suite |

The server listens on `http://localhost:3000` by default. Set the `PORT` environment variable to change it.

### Run with Docker

```bash
docker build -t task-manager-api .
docker run -p 3000:3000 task-manager-api
```

## 📡 API

Interactive docs: **http://localhost:3000/api-docs**

| Method | Path | Description | Success |
| --- | --- | --- | --- |
| `POST` | `/tasks` | Create a task. Body: `{ "title": string }` | `201 Created` |
| `GET` | `/tasks` | List all tasks | `200 OK` |

**Create a task**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write the README"}'
```

```json
{
  "id": "3f1c2b9e-7a1d-4c8e-9a43-2d8f6b0e5c11",
  "title": "Write the README",
  "completed": false,
  "createdAt": "2026-02-11T10:00:00.000Z"
}
```

**List tasks**

```bash
curl http://localhost:3000/tasks
```

**Errors** use a single shape for validation errors (`400`), unknown routes (`404`) and unexpected failures (`500`):

```json
{ "status": "error", "message": "Title is required and must be a non-empty string" }
```

## 🧪 Tests

```bash
npm test
```

`tests/task.test.ts` drives the Express app in-process with Supertest (no running server needed). It covers:

- creating a task with a valid title (`201`, generated `id`, `completed: false`, `createdAt`)
- rejecting a missing or whitespace-only title (`400`)
- listing tasks and checking the returned task structure

## 📁 Project Structure

```
src/
├── app.ts                       # Express app: middleware, routes, 404 + error handlers
├── server.ts                    # Entry point (reads PORT, starts the server)
├── controllers/task.controller.ts
├── services/task.service.ts     # Business logic + in-memory task store
├── routes/task.routes.ts
├── middleware/
│   ├── validate.middleware.ts   # express-validator rules for task creation
│   └── error.middleware.ts      # Global error handler
├── models/task.model.ts         # Task and CreateTaskDto types
├── utils/appError.ts            # Operational error class with HTTP status
└── docs/swagger.ts              # OpenAPI 3 spec
tests/
└── task.test.ts                 # Jest + Supertest integration tests
```

## 🧭 Design Notes

- **Controller → Service layering.** Controllers handle HTTP only; the service owns the data. Swapping the in-memory array for a database means changing the service, not the routes.
- **In-memory storage** keeps the project dependency-free; data resets on restart.
- **OpenAPI spec defined in one file** (`src/docs/swagger.ts`) instead of JSDoc comments, keeping controllers clean.
- **Consistent errors.** Anything thrown as an `AppError` keeps its status code and message; anything else becomes a generic `500` and is logged.
- AI tools were used for boilerplate config (TypeScript, Docker), initial scaffolding and the initial test setup.

## 📄 License

[MIT](LICENSE)
