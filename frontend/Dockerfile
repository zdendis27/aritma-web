FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_API_URL=http://localhost:4000/api
ENV VITE_API_URL=$VITE_API_URL

COPY package.json ./
COPY frontend/package.json frontend/package.json

RUN npm install --workspace frontend

COPY frontend ./frontend

WORKDIR /app/frontend
RUN npm run build

FROM nginx:1.27-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html

EXPOSE 80
