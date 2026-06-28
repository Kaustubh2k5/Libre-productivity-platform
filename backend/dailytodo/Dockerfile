# =========================
# Base
# =========================
FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      openssl \
      ca-certificates && \
    rm -rf /var/lib/apt/lists/*


# =========================
# Dependencies
# =========================
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile


# =========================
# Build
# =========================
FROM deps AS builder

COPY prisma ./prisma
COPY tsconfig*.json ./
COPY src ./src

RUN pnpm prisma generate
RUN pnpm build


# =========================
# Migration Image
# Contains Prisma CLI
# =========================
FROM builder AS migrate

CMD ["./node_modules/.bin/prisma", "migrate", "deploy"]


# =========================
# Production Dependencies
# =========================
FROM builder AS prod-deps

RUN pnpm prune --prod


# =========================
# Runtime
# =========================
FROM node:22-bookworm-slim AS runner

ENV NODE_ENV=production
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      openssl \
      ca-certificates && \
    rm -rf /var/lib/apt/lists/*

RUN groupadd -r appgroup && \
    useradd -r -g appgroup -u 1001 appuser

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 5003

CMD ["node", "dist/server.js"]