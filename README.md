# recall-watch

A drug recall tracker built on the free openFDA drug enforcement data.

**Work in progress.** This project is being built in phases. Features that are
not yet implemented will be documented as such.

## Local database

Copy `.env.example` to `.env`, then run `docker compose up -d` from this
directory. Docker Compose starts the local PostgreSQL database and creates a
separate database for tests on first initialization.

## Disclaimer

This is an information tool, not medical advice. openFDA adverse event or
recall data does not prove harm.
