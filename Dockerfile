FROM node:lts AS base

RUN npm install -g pnpm@12.21.0

# ----------------------------
# Stage 1: Install all dependencies
# ----------------------------
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ----------------------------
# Stage 2: Build the application
# ----------------------------
FROM deps AS build
WORKDIR /app
COPY . .
RUN node ace build

# ----------------------------
# Stage 3: Production runtime
# ----------------------------
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/build ./
COPY pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY docker-entrypoint.js ./

EXPOSE 3333
CMD ["node", "docker-entrypoint.js"]
