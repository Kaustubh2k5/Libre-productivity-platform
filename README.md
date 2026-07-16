<p align="center">
	<img src="assets/hero-banner.png" alt="Libre Hero" width="920" />
</p>

#      NOT just another Productivity tracker.

Live product: `https://libre-productivity.xyz`

## Overview

Libre exists to solve a practical problem: getting distracted is normal, but getting back on track is hard. The product is built for people who want to protect deep work time.

The repository follows a modular approach with separate services, shared conventions, and infrastructure code alongside application code.

## Product Snapshot

- Core focus: helping users return to focused work after interruptions.
- Current repository scope: product frontend, multiple backend services, and infrastructure code in one monorepo.

## Features

### Product experience

- Refocus-first workflow that emphasizes returning to meaningful work after interruptions.
- Web frontend built for quick interaction loops.
- Highly customizable , it can be a simple note taking app or an elaborate progress reporter. Freedom to manually tweak existing task schemas and roadmaps.
- A System that acts and changes behavior from long term user preferences.

### Backend platform

- Service-oriented TypeScript backend with clear controller, middleware, and repository layers.
- Prisma schemas and migrations per service for explicit data modeling.
- Event-driven patterns with Kafka integration in selected services.
- Runtime and logic related validations for consistency and security.

### Cloud and operations

- Docker and Docker Compose support for local container workflows.
- Terraform modules and environment layouts for repeatable infrastructure changes.
- Cloud Build configuration for CI/CD automation.
- Github actions for IaC related CI/CD triggers. 

## Codebase Architecture

High-level design:

- Frontend: React + Vite app in `frontend/`.
- Backend: multiple TypeScript services in `backend/`.
- Data: Prisma-based database access in each service.
- Messaging: Kafka integration in relevant service modules.
- Infrastructure: Terraform modules in `infra/terraform/`.

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React, TypeScript, Vite | Product UI and client-side app runtime |
| Backend | Node.js, TypeScript | API services and business logic |
| Data access | Prisma | Schema, migrations, and query layer |
| Messaging | Kafka | Asynchronous event handling |
| Monorepo | pnpm workspaces | Package management and workspace orchestration |
| Containers | Docker, Docker Compose | Local service packaging and orchestration |
| Infrastructure as Code | Terraform | Environment and cloud resource provisioning |
| CI/CD | Cloud Build | Automated build and deployment steps |

### Module-level stack by concern

| Concern | Modules / Libraries | Where used | Why it is used |
|---|---|---|---|
| UI rendering | `react`, `react-dom` | `frontend/` | Component-based UI and client rendering |
| Routing | `react-router-dom` | `frontend/` | SPA route composition and navigation |
| Server state and caching | `@tanstack/react-query` | `frontend/` | API request lifecycle, caching, and refetch strategy |
| Form handling and validation | `react-hook-form`, `@hookform/resolvers`, `zod` | `frontend/` and backend services | Form state management and shared schema-driven validation |
| Client HTTP layer | `axios` | `frontend/src/lib/` | Typed API calls and interceptor-friendly HTTP client |
| UI motion and icons | `framer-motion`, `lucide-react` | `frontend/` | Interaction polish and consistent iconography |
| Client state | `zustand` | `frontend/` | Lightweight global state for product flows |
| API runtime | `express` | `backend/auth`, `backend/dailytodo`, `backend/onboarding`, `backend/sandbox` | HTTP API handling and middleware pipeline |
| Cross-origin access | `cors` | backend services | Browser-to-service access control for local and deployed clients |
| Environment config | `dotenv` | backend services | Environment variable loading for local/runtime config |
| Auth tokens | `jsonwebtoken` | backend services | JWT issuing and verification for auth-protected routes |
| Password hashing | `bcrypt`, `bcryptjs` | `backend/auth` | Credential hashing and verification |
| Database access | `@prisma/client`, `prisma` | all backend services with Prisma | Type-safe ORM access, schema management, and migrations |
| Cache/session infra | `ioredis` | `backend/auth`, `backend/onboarding` | Redis-backed ephemeral state and fast lookups |
| Email delivery | `nodemailer` | `backend/auth` | Transactional email workflows (for example OTP or onboarding emails) |
| Event streaming | `kafkajs` | `backend/dailytodo` | Producer/consumer event-driven workflows |
| Time zone utilities | `date-fns-tz` | `backend/dailytodo` | Time zone-safe scheduling and date normalization |
| Type-safe runtime validation | `zod` | frontend and backend services | Request/response validation and contract safety |
| Local dev runtime | `tsx`, `nodemon` | backend services | Fast TypeScript execution and watch-mode development |
| Build tooling | `typescript`, `vite`, `@vitejs/plugin-react` | frontend and backend | Compile, bundle, and optimize TypeScript code |
| Styling pipeline | `tailwindcss`, `postcss`, `autoprefixer` | `frontend/` | Utility-based styling and CSS build pipeline |
| Linting and formatting | `eslint`, `typescript-eslint`, `prettier`, `lint-staged`, `husky` | frontend and monorepo root | Enforce code quality and pre-commit hygiene |

### Service dependency map

| Service | Primary runtime modules | Notes |
|---|---|---|
| `backend/auth` | `express`, `@prisma/client`, `jsonwebtoken`, `bcrypt`/`bcryptjs`, `ioredis`, `nodemailer`, `zod` | Authentication, token lifecycle, and identity workflows |
| `backend/dailytodo` | `express`, `@prisma/client`, `jsonwebtoken`, `kafkajs`, `date-fns-tz`, `zod` | Task APIs, async processing, and schedule-aware operations |
| `backend/onboarding` | `express`, `@prisma/client`, `jsonwebtoken`, `ioredis`, `zod` | User onboarding orchestration and stateful flow support |
| `backend/sandbox` | `express`, `@prisma/client`, `jsonwebtoken`, `zod` | Isolated experimentation and sandboxed API behavior |
| `frontend` | `react`, `react-router-dom`, `@tanstack/react-query`, `react-hook-form`, `zod`, `axios`, `zustand` | Product UI, state, API integration, and validation |

## Repository Structure

```text
.
├── backend/
│   ├── auth/
│   ├── dailytodo/
│   ├── onboarding/
│   └── sandbox/
├── frontend/
├── infra/
│   └── terraform/
├── cloudbuild/
├── package.json
└── pnpm-workspace.yaml
```

Major directories:

- `backend/`: independent backend services with their own `src/`, `prisma/`, and Docker config.
- `frontend/`: React + Vite product frontend.
- `infra/terraform/`: reusable modules and environment-specific Terraform configuration.
- `cloudbuild/`: pipeline definitions for cloud-based CI/CD workflows.

## Getting Started

### Prerequisites

- Node.js LTS
- pnpm
- Docker
- Docker Compose

### Installation

```bash
pnpm install --frozen-lockfile
```

### Environment variables

Create `.env` files in each service directory as needed.

```text
DATABASE_URL=
JWT_SECRET=
KAFKA_BROKERS=
```

## Security

- Authentication: JWT-based auth patterns are present.
- Authorization: enforce role and policy checks in middleware and service boundaries.
- JWT and refresh tokens: token lifecycle and rotation policy pending documentation.
- Secret management: use secret stores, not repository files.
- HTTPS: terminate TLS at ingress.
- Validation and sanitization: validate all external input and sanitize user-provided content.
- Principle of least privilege: scope service and CI permissions narrowly.

## Deployment

### Development

Run services with pnpm or Docker Compose.

### Production

Live product: `https://libre-productivity.xyz`

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).

See `LICENSE` for the full license text.


## Acknowledgements

- Core ideation and initial development: see [CONTRIBUTORS.md](CONTRIBUTORS.md).


