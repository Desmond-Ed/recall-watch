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
