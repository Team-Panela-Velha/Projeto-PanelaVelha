# Etapa 1: build do React/Vite
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: Nginx serve os arquivos estáticos e repassa /api para o backend
FROM nginx:alpine

# endereço do backend na rede do Docker (nome do serviço no docker-stack.yml)
ENV BACKEND_HOST=backend:5000

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
