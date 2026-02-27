# Database and ORM

I used a **PostgreSQL** database with **Prisma ORM** for data storage. The PostgreSQL server is deployed on **Supabase**.

# Database Schema

### User
- Although not in the initial requirements, I included user-based operations as an essential part of the application.
- The `userName` field is marked as **unique**.
- The `signUp` and `updateById` service methods verify the uniqueness of the `userName`.

### Task
- The `title` field is defined as a unique string in combination with `userId`.
- The `isCompleted` field is a boolean.
- The `TasksService` methods (`create` and `updateById`) verify the uniqueness of the title for each user.
- I used the `is` prefix for boolean naming (`isCompleted`) to maintain my personal coding standards.

### Relationship
- There is a **one-to-many** relationship between Users and Tasks: one user can have multiple tasks, but each task belongs to only one user.

# Routing

The routing logic is automated via `index.ts`. It scans the `controllers/` folder, filters files with the `.controllers.ts` suffix, and automatically sets the filename prefix as the base URL route for all methods within that controller. This eliminates the need for manual imports for every new controller.

# DTO & validateDtoMiddleware

- I used **classes** with **class-validator** decorators for DTO models instead of interfaces.
- By using `validateDtoMiddleware`, I successfully decoupled input validation from the core business logic.
- If an input fails validation, the middleware returns a **400 status code**, preventing the request from reaching the route handler.

# Response

All response interfaces extend a `ResponseBase` interface, ensuring every response consistently contains `isSuccess`, `message`, and `statusCode`.

# authorizationMiddleware

This middleware handles authentication for protected routes. It verifies the **HTTP-only JWT cookie** from the request. If the user is not authorized, it returns a **401 status code**.

# Error Handling

Business logic errors are managed using **try-catch** blocks. If an error occurs, it is logged to the console, and a **500 status code** with an "internal server error" message is returned.

# Folder Structure

Given the small scope of the app, I used a **layer-based** structure (controllers, services, types). For larger applications, I would typically use a **feature-based** structure (e.g., `features/users`, `features/tasks`).

# Unit Tests

- I used **Docker Compose** to set up a local test database to keep it separate from development.
- Test scripts use `dotenv-cli` to load `.test.env` containing the test database connection string.
- In `test/setup.ts`, the database is cleared within the `beforeEach` scope, providing an isolated environment for every test.
- Unit tests cover `TasksService.create` and `TasksService.readAllByUserId`, focusing on edge cases and various logical scenarios.

# Docker & Deployment

I created a **Dockerfile** to build the image, pushed it to **Docker Hub**, and deployed it to **Render**.

**Docker Image:** [altnbsmehmet/case-study-task-management-api](https://hub.docker.com/r/altnbsmehmet/case-study-task-management-api)

# Swagger

API documentation was generated using **Swagger** comments.

**Docs:** [View Swagger UI](https://case-study-task-management-api-latest.onrender.com/api-docs)

# Live Demo

**API Domain:** [https://case-study-task-management-api-latest.onrender.com](https://case-study-task-management-api-latest.onrender.com)

# AI Usage Disclosure

I utilized AI for assistance with:
- Writing middlewares
- Unit test setup
- Dockerfile configuration
- Swagger setup

All other components were implemented based on my existing experience.
