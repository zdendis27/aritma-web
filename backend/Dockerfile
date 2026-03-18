FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY backend/package.json backend/package.json
COPY database/package.json database/package.json
COPY database/prisma database/prisma

RUN npm install --workspace backend --workspace database
RUN npx prisma generate --schema database/prisma/schema.prisma

COPY backend ./backend

RUN npm run build --workspace backend

EXPOSE 4000

CMD ["npm", "run", "start", "--workspace", "backend"]
