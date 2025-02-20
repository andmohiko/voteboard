FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN apk add --no-cache bash git && npm install -g pnpm@8.15.9 

FROM base AS backend
COPY . ./
RUN pnpm install --frozen-lockfile
WORKDIR /app/apps/backend

RUN pnpm install --frozen-lockfile

EXPOSE 8080

RUN pnpm build 
RUN pnpm prisma generate 

CMD ["pnpm", "start"]
