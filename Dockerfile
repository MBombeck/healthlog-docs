FROM node:22-alpine AS build
WORKDIR /app
# This project is pnpm-managed (pnpm-lock.yaml is the source of truth). The old
# `npm ci` against a stale package-lock.json drifted out of sync and broke the
# build; use pnpm with the frozen lockfile to match the repo toolchain.
RUN npm install -g pnpm@10
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Inline script hashes for the CSP (scripts/csp-hashes.mjs); conf.d is included
# in the http context, where the map has to live.
COPY --from=build /app/csp-hashes.conf /etc/nginx/conf.d/csp-hashes.conf
EXPOSE 80
