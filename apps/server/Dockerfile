# TODO: Remove dev deps from prod build
# BUILDER - Stage 1
#FROM --platform=linux/amd64 node:alpine as builder
FROM node:18-alpine as base
WORKDIR /app
RUN apk update && npm i -g turbo

FROM base as builder
COPY . .
RUN turbo prune --scope=server --docker

# INSTALLER - Stage 2
FROM base as installer
WORKDIR /app
RUN apk update && apk add g++ make py3-pip && npm i -g pnpm

# First install dependencies (as they change less often)
COPY --from=builder /app/out/full/.gitignore ./.gitignore
COPY --from=builder /app/out/full/turbo.json ./turbo.json
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --ignore-scripts

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN pnpm install --ignore-scripts
RUN pnpm turbo run build --filter=server...

# # RUNNER - Stage 3
FROM node:alpine AS runner
WORKDIR /app

# # Don't run production as root
RUN addgroup --system --gid 1001 app
RUN adduser --system --uid 1001 app
USER app
COPY --from=installer /app .

CMD ["node", "apps/server/dist/index.cjs"]