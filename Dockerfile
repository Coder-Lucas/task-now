FROM node:22.22.0-alpine AS builder
RUN npm i -g pnpm@10.30.3
WORKDIR /usr/node/app
COPY package.json pnpm-lock.yaml .
RUN pnpm i
COPY . .
RUN pnpm build

FROM node:22.22.0-alpine
LABEL org.opencontainers.image.description="SharpNote：你的 Markdown 专属写作空间。极简设计，操作直观，专注于写作本身。响应迅速，即开即用，捕捉每一个灵感瞬间。隐私安全，本地存储，所有数据全部存储于浏览器。完全开源，永久免费，开启你的写作之旅。"
LABEL org.opencontainers.image.licenses="MIT"
LABEL org.opencontainers.image.title="SharpNote"
LABEL org.opencontainers.image.source="https://github.com/Coder-Lucas/sharp-note.git"
LABEL org.opencontainers.image.url="https://shnt.netlify.app"
WORKDIR /usr/node/app
COPY --from=builder /usr/node/app/.next/standalone .
COPY --from=builder /usr/node/app/.next/static .next/static
COPY --from=builder /usr/node/app/public public
USER node
EXPOSE 3000
HEALTHCHECK CMD wget  -qO- http://127.0.0.1:3000 | grep -q OK
ENTRYPOINT ["node"]
CMD ["server.js"]
