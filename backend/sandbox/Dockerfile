# --------------------------
# Builder
# --------------------------

FROM node:22 AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@11.1.1 --activate

COPY package.json ./

# RUN pnpm install
RUN pnpm install --dangerously-allow-all-builds

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

EXPOSE 8083

CMD ["dist/server.js"]