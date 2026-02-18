FROM node:22.22.0-alpine AS builder
LABEL org.opencontainers.image.authors="sharpnote.yen802@aleeas.com"
LABEL org.opencontainers.image.description="SharpNote：你的 Markdown 专属写作空间。极简设计，操作直观，专注于写作本身。响应迅速，即开即用，捕捉每一个灵感瞬间。隐私安全，本地存储，所有数据全部存储于浏览器。完全开源，永久免费，开启你的写作之旅。"
LABEL org.opencontainers.image.documentation="https://shnt.netlify.app/docs"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.title="SharpNote"
LABEL org.opencontainers.image.source="https://github.com/Coder-Lucas/sharp-note.git"
LABEL org.opencontainers.image.url="https://shnt.netlify.app"
WORKDIR /usr/src/app
RUN npm i -g pnpm@10.29.3
COPY package.json pnpm-lock.yaml .
RUN pnpm i
COPY . .
RUN pnpm build

FROM node:22.22.0-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/.next/standalone .
COPY --from=builder /usr/src/app/.next/static .next/static
COPY --from=builder /usr/src/app/public public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
