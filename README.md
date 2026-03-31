# SK Aritma Praha Web

Moderní full-stack webová aplikace pro fotbalový klub SK Aritma Praha. Projekt obsahuje veřejný web, administraci, REST API, PostgreSQL databázi, Prisma ORM a Docker přípravu pro nasazení.

## Technologie

- Frontend: React, TypeScript, Vite, React Router, TailwindCSS, Axios, React Hook Form, Zod
- Backend: Node.js, Express, TypeScript, JWT, bcrypt
- Databaze: PostgreSQL, Prisma ORM
- Deployment: Docker, Docker Compose

## Struktura projektu

```text
aritma-web
├ frontend
├ backend
├ database
└ docker
```

## Instalace

1. Nainstalujte závislosti:

```bash
cd aritma-web
npm install
```

2. Zkopírujte `.env.example` soubory:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp database/.env.example database/.env
```

3. Spusťte PostgreSQL databázi přes Docker:

```bash
docker compose -f docker/docker-compose.yml up -d db
```

4. Vygenerujte Prisma klienta a aplikujte migrace:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Naplňte databázi seed daty:

```bash
npm run seed
```

## Spuštění

V oddělených terminálech:

```bash
cd aritma-web
npm run dev:backend
npm run dev:frontend
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000/api`
- Admin: `http://localhost:5173/admin`

## Docker

Kompletní lokální stack:

```bash
docker compose -f docker/docker-compose.yml up --build
```

## Dokumentace a poster

- Technická dokumentace: `dokumentace/technicka-dokumentace.md`
- Uživatelská dokumentace: `dokumentace/uzivatelska-dokumentace.md`
- Poster HTML: `poster/poster-a4.html`
- Poster PDF: `poster/poster-a4.pdf`

## Databázový model

- `User`: admin uživatel
- `Team`: týmové kategorie
- `Player`: hráči vázaní na tým
- `Match`: zápasy vztažené k týmu
- `Article`: novinky a články
- `Gallery`: galerie fotografií

## API

Základní endpointy:

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/matches`
- `GET /api/matches/:id`
- `POST /api/matches`
- `PUT /api/matches/:id`
- `DELETE /api/matches/:id`
- `GET /api/teams`
- `POST /api/teams`
- `PUT /api/teams/:id`
- `DELETE /api/teams/:id`
- `GET /api/players`
- `POST /api/players`
- `PUT /api/players/:id`
- `DELETE /api/players/:id`
- `GET /api/articles`
- `POST /api/articles`
- `PUT /api/articles/:id`
- `DELETE /api/articles/:id`
- `GET /api/gallery`
- `POST /api/gallery`
- `DELETE /api/gallery/:id`
- `GET /api/standings`

Veřejné `GET` endpointy jsou přístupné bez přihlášení. Zápisové operace vyžadují JWT token admina.

## Seed data

Seed vytvoří:

- 1 admin účet
- týmy `A tým`, `B tým`, `U19`, `U17`, `U15`
- ukázkové hráče
- ukázkové zápasy
- ukázkové články
- ukázkové galerie

Výchozí admin přihlášení:

- Email: `admin@aritma.cz`
- Heslo: `Aritma123!`

## Poznámky k architektuře

- Frontend používá malé znovupoužitelné komponenty a samostatné services vrstvy.
- Backend má oddělené controllery, routes, middleware a validaci.
- Prisma schema a seed jsou uložené v `database`.
- Pro rychlé nasazení jsou připravené Dockerfile pro frontend i backend.
