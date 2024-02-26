FROM node:18-alpine
RUN apk add --no-cache libc6-compat

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /home/node/app

COPY package*.json ./

USER node

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "pnpm", "dev" ]
