## ベースイメージの指定（Node.js 20）
FROM node:20-alpine AS base
# 必要なパッケージをインストール
RUN apk add --no-cache libc6-compat bash git && npm install -g pnpm@8.15.9 

FROM base AS builder
WORKDIR /app
# Monorepo 全体のコードをコピー
COPY . ./
# 依存関係をインストール（ワークスペース全体を考慮）
RUN pnpm install --frozen-lockfile
WORKDIR /app/apps/backend
# backendをビルド
RUN pnpm build 
# Prismaのスキーマを生成
RUN pnpm prisma generate

# 実行環境を作成
FROM base AS runner
# buildで生成したファイルをコピー
#FIXME: 適切な実行ファイルのみをコピーするように修正したい
COPY --from=builder /app /app
WORKDIR /app/apps/backend
EXPOSE 8080
CMD ["pnpm", "start"]
