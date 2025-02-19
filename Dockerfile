# 1. ベースイメージを指定（Node.js 20）
FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache libc6-compat

# 2. 作業ディレクトリを設定
WORKDIR /app

# 3. 必要なパッケージをインストール（pnpm, bash, git）
RUN apk add --no-cache bash git && npm install -g pnpm@8.15.9

# 4. Monorepo 全体のコードをコピー
COPY . ./

# 5. 依存関係をインストール（ワークスペース全体を考慮）
RUN pnpm install --frozen-lockfile

# 6. `apps/backend` をビルド
RUN cd apps/backend && pnpm build

# 7. Prisma のスキーマを生成
RUN cd apps/backend && pnpm prisma generate

# 8. 実行環境を作成
FROM base AS runner
WORKDIR /app
RUN apk add --no-cache bash git && npm install -g pnpm@8.15.9

# 9. Userの設定
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

# 10. 必要なファイルをコピー
COPY --from=builder --chown=hono:nodejs /app /app

# 13. ポートを公開
USER hono
EXPOSE 8080

# 14. アプリを実行
CMD ["pnpm", "start"]
