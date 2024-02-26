FROM node:18-alpine

RUN corepack enable

WORKDIR /home/app

COPY . .

RUN pnpm install

ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000
