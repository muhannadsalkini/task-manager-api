# Task Management API

## Project Overview
A clean, production-style Task Management API built with Node.js, Express, and TypeScript. This API demonstrates a solid architectural foundation, including creating and listing tasks, input validation, centralized error handling, and Swagger documentation.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Documentation**: Swagger (OpenAPI 3)
- **Testing**: Jest + Supertest
- **Containerization**: Docker

## Architecture Explanation
The project follows a layered architecture (Controller-Service-Repository pattern, simplified to Controller-Service for this use case since we use in-memory storage):

- **Controllers**: Handle HTTP requests, responses, and calls to services. They are decoupled from business logic.
- **Services**: Contain business logic. In this case, managing the in-memory task list.
- **Models**: TypeScript interfaces defining the shape of our data (DTOs and Entities).
- **Middleware**: Cross-cutting concerns like Error Handling and Validation.
- **Utils**: Helper classes like `AppError`.

This separation of concerns ensures the code is testable, maintainable, and scalable.

## How to Run Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Development Mode**
   ```bash
   npm run dev
   ```
   Server will start on `http://localhost:3000`

3. **Build & Run Production**
   ```bash
   npm run build
   npm start
   ```

## How to Run Tests

Run the integration tests using Jest:
```bash
npm test
```

## How to Run with Docker

1. **Build the Image**
   ```bash
   docker build -t task-manager-api .
   ```

2. **Run the Container**
   ```bash
   docker run -p 3000:3000 task-manager-api
   ```

## Swagger Documentation
Interactive API documentation is available at:
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Example Requests

**Create a Task**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Complete the coding challenge"}'
```

**Create a Task (Validation Error)**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" 
```

**Get All Tasks**
```bash
curl http://localhost:3000/tasks
```

**Not Found Example (404)**
```bash
curl http://localhost:3000/unknown-route
```

## Section: Approach, Design Decisions, & AI Usage

### Approach
I prioritized **clarity and simplicity** over complexity.
- Used **In-Memory Storage** as requested, avoiding DB complexity / ORM setup.
- Implemented **Layers** (Controller, Service) to show readiness for scaling to a real DB.
- **Validation** is done via `express-validator` to ensure robust and chainable validation logic.

### Design Decisions
- **Dependency Injection**: The `TaskController` instantiates `TaskService`. In a complex app, we'd use a DI container (like `tsyringe` or NestJS), but for this scope, manual instantiation keeps it readable.
- **Swagger**: Defined the spec manually in `src/docs/swagger.ts` to keep `controllers` clean of verbose decorators/comments, suitable for a strict small-scope project.
- **Error Handling**: Custom `AppError` class and global middleware ensure consistent error responses.

### Where AI Tools Were Used
AI was used to:
- Generate the boilerplate configuration for TypeScript and Docker.
- Scaffolding basic CRUD logic to speed up typing.
- Structuring the README to look professional.
- Writing the initial test suite setup.
