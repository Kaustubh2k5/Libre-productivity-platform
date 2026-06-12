# --------------------------
# Builder
# --------------------------

FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate

RUN pnpm build

RUN pnpm prune --prod


# --------------------------
# Runtime
# --------------------------

FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json ./

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/prisma ./prisma

EXPOSE 8080

CMD ["dist/server.js"]