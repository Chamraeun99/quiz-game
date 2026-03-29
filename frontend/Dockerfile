# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .
RUN npm run build

FROM node:20-alpine AS app
WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

ENV PORT=4173

EXPOSE 4173

CMD ["sh", "-c", "serve -s dist -l ${PORT:-4173}"]