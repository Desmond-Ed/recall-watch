# Project decisions

Entries use this format:

- **Date:** YYYY-MM-DD
- **Decision:** What was chosen.
- **Reason:** Why it was chosen.
- **Alternatives:** Other options considered.

## 2026-11-27

- **Date:** 2026-11-27
- **Decision:** Use one PostgreSQL 17 Alpine service and create `recall_watch_test` with a SQL initialization script.
- **Reason:** One local service and port serve both development and test databases, avoiding a second container while keeping test data separate. The official image's initialization directory runs the script when the named data volume is initialized.
- **Alternatives:** Run a second PostgreSQL service on another host port; create the test database manually.

- **Date:** 2026-11-27
- **Decision:** Include `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` in `.env.example` alongside the application settings.
- **Reason:** The official PostgreSQL image needs these values to initialize the server, and Compose passes them from the ignored `.env` file. The database URLs use matching local development placeholders.
- **Alternatives:** Hard-code local database credentials in Compose; derive server credentials from the connection URL.

- **Date:** 2026-11-27
- **Decision:** Pin the Compose image to the PostgreSQL 17 Alpine major-version tag.
- **Reason:** A major-version tag provides a predictable PostgreSQL data format while receiving updates within that major line.
- **Alternatives:** Use the floating `postgres` tag; use another major version.

- **Date:** 2026-11-27
- **Decision:** Make the host port configurable with a default of 5432.
- **Reason:** The requested standard port remains the default, while a developer with another local database already bound to 5432 can run this project on a free port without stopping the other service.
- **Alternatives:** Always bind host port 5432; use a fixed nonstandard host port.

- **Date:** 2026-11-27
- **Decision:** Publish the project in the public GitHub repository `Desmond-Ed/recall-watch`.
- **Reason:** The repository owner requested a public GitHub repository and a push of the local project.
- **Alternatives:** Keep the repository local; create a private GitHub repository.

- **Date:** 2026-11-27
- **Decision:** Use ES modules with Node's `NodeNext` TypeScript settings.
- **Reason:** This works with the TypeScript source imports used by tsx, Vitest, and Node. Source imports include `.js` extensions so the compiled output runs as native ESM.
- **Alternatives:** CommonJS with extensionless imports.

- **Date:** 2026-11-27
- **Decision:** Load the repository-root `.env` file with Node's built-in `process.loadEnvFile` in the server entry point.
- **Reason:** It avoids an extra dependency, and keeping environment loading outside the config module lets tests pass environment objects directly.
- **Alternatives:** Use dotenv; load environment files inside the config module.

- **Date:** 2026-11-27
- **Decision:** Validate configuration with Zod, require `PORT`, default `NODE_ENV` and `LOG_LEVEL`, and treat blank optional values as unset.
- **Reason:** Invalid runtime configuration fails early with variable names and validation messages, without echoing values that might be secrets.
- **Alternatives:** Read process environment variables directly in each module; require every setting before those features are implemented.

- **Date:** 2026-11-27
- **Decision:** Keep the Express app construction separate from the server listener.
- **Reason:** Tests can exercise routes with Supertest without binding a network port.
- **Alternatives:** Put app setup and listening in one module.

- **Date:** 2026-11-27
- **Decision:** Return API errors in a consistent `{ "error": { "code", "message" } }` shape and hide unknown error details from clients.
- **Reason:** Clients get a predictable response, while internal error details are logged rather than exposed.
- **Alternatives:** Return different error shapes per route; expose internal error messages.

- **Date:** 2026-11-27
- **Decision:** Use separate TypeScript configurations for checking source and tests versus emitting the API build.
- **Reason:** Tests are type-checked without being included in the production output.
- **Alternatives:** Use one TypeScript configuration for both checking and building.
