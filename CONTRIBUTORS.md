# Contributors

This file contains the project run guide, contribution workflow, and attribution details.

## Running the project

Current status:
- Full end-to-end product bootstrapping is not yet documented.
- Individual services and the frontend can be run for development.

Run the frontend:

```bash
cd frontend
pnpm dev
```

Run an example backend service:

```bash
cd backend/dailytodo
pnpm dev
```

Run a Docker-based service:

```bash
cd backend/auth
docker compose up --build
```

### Development workflow

- Use pnpm workspaces to run commands per package.
- Keep migrations and schema changes scoped to the owning service.

### Production deployment

> TODO: Document this section.

### Docker setup

- Each backend service includes a Multilayer `Dockerfile` and usually a `docker-compose.yml`.

## Contributing

- Branch naming: `feature/<name>`, `fix/<name>`, `chore/<name>`.
- Commit convention: Conventional Commits, for example `feat: add onboarding endpoint`.
- Pull requests: include scope, testing notes, and migration notes when applicable.
- Code style: follow project linting and formatting rules.
- Testing: include tests for behavior changes and regression-sensitive paths.

## Core ideation and initial development

- Kaustubh Sardesai
- Anubhav Rawat

## Additional contributors

> TODO: Add additional contributors as the project grows.