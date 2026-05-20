FROM node:22-bookworm-slim AS base

WORKDIR /app

RUN corepack enable

RUN apt-get update -y && apt-get install -y openssl


# =========================================
# Dependencies
# =========================================
FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

# =========================================
# Builder
# =========================================
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build TypeScript
RUN pnpm build

# =========================================
# Production
# =========================================
FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

EXPOSE 3000

CMD ["node", "dist/server.js"]