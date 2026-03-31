# Technická dokumentace

**Projekt:** SK Aritma Praha Web  
**Autor:** Zdeněk Vacek  
**Třída:** C3a  
**Škola:** SPŠE Ječná  
**Datum:** 31. 3. 2026

## 1. Úvod

Projekt SK Aritma Praha Web je moderní full-stack webová aplikace určená pro prezentaci fotbalového klubu a správu jeho obsahu. Aplikace kombinuje veřejnou část webu pro návštěvníky a administrační rozhraní pro správce obsahu.

## 2. Cíl projektu

Cílem projektu je vytvořit přehledný web fotbalového klubu, který umožní:

- zobrazovat novinky, týmy, zápasy a galerii,
- spravovat obsah přes administraci,
- ukládat data do relační databáze,
- připravit aplikaci pro lokální spuštění i nasazení pomocí Dockeru.

## 3. Použité technologie

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios
- React Hook Form
- Zod

### Backend

- Node.js
- Express
- TypeScript
- JWT
- bcrypt

### Databáze a ORM

- PostgreSQL
- Prisma ORM

### Nasazení

- Docker
- Docker Compose

## 4. Struktura projektu

Projekt je rozdělen do několika hlavních částí:

```text
aritma-web
├── frontend
├── backend
├── database
├── docker
├── poster
└── dokumentace
```

### Význam složek

- `frontend` obsahuje klientskou část aplikace vytvořenou v Reactu.
- `backend` obsahuje REST API, autentizaci a aplikační logiku.
- `database` obsahuje Prisma schéma, migrace a seed data.
- `docker` obsahuje konfigurační soubory pro spuštění přes Docker Compose.
- `poster` obsahuje prezentační plakát projektu.
- `dokumentace` obsahuje technickou a uživatelskou dokumentaci v Markdownu.

## 5. Architektura aplikace

### Frontend

Frontend používá knihovnu React a je rozdělen do logických částí:

- `pages` obsahuje jednotlivé stránky webu,
- `components` obsahuje znovupoužitelné komponenty,
- `services` zajišťují komunikaci s backend API,
- `hooks` obsahují vlastní React hooky,
- `layout` definuje hlavní rozložení veřejné i administrační části,
- `types` obsahují TypeScript typy.

Veřejná část webu obsahuje tyto hlavní stránky:

- Domů
- Zápasy
- Týmy
- Novinky
- Klub
- Kalendář
- Galerie

Administrace obsahuje:

- přihlášení správce,
- dashboard,
- správu zápasů,
- správu týmů,
- správu hráčů,
- správu novinek,
- správu galerie.

### Backend

Backend je postavený na Expressu a je rozdělen na:

- `routes` pro definici endpointů,
- `controllers` pro obsluhu HTTP požadavků,
- `services` pro práci s daty a business logiku,
- `models` pro validační schémata a datové typy,
- `middleware` pro autentizaci, validaci a zpracování chyb,
- `config` pro konfiguraci prostředí a připojení k databázi,
- `utils` pro pomocné funkce a třídy.

## 6. Databázový model

Databáze je navržena pomocí Prisma ORM. Hlavní entity projektu jsou:

- `User` - administrátor systému,
- `Team` - týmová kategorie,
- `Player` - hráč přiřazený k týmu,
- `Match` - zápas týmu,
- `Article` - novinka nebo článek,
- `Gallery` - galerie fotografií.

Vztahy mezi entitami:

- tým může mít více hráčů,
- tým může mít více zápasů,
- administrátor spravuje obsah systému.

## 7. API rozhraní

Backend poskytuje REST API. Mezi hlavní endpointy patří:

### Autentizace

- `POST /api/auth/login`
- `GET /api/auth/me`

### Zápasy

- `GET /api/matches`
- `GET /api/matches/:id`
- `POST /api/matches`
- `PUT /api/matches/:id`
- `DELETE /api/matches/:id`

### Týmy

- `GET /api/teams`
- `POST /api/teams`
- `PUT /api/teams/:id`
- `DELETE /api/teams/:id`

### Hráči

- `GET /api/players`
- `POST /api/players`
- `PUT /api/players/:id`
- `DELETE /api/players/:id`

### Novinky

- `GET /api/articles`
- `POST /api/articles`
- `PUT /api/articles/:id`
- `DELETE /api/articles/:id`

### Galerie

- `GET /api/gallery`
- `POST /api/gallery`
- `DELETE /api/gallery/:id`

Veřejné `GET` endpointy jsou dostupné bez přihlášení. Operace pro vytváření, úpravu a mazání vyžadují přihlášení administrátora pomocí JWT tokenu.

## 8. Instalace a spuštění

### Instalace závislostí

```bash
cd aritma-web
npm install
```

### Nastavení prostředí

Podle README se mají zkopírovat soubory s proměnnými prostředí:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp database/.env.example database/.env
```

### Spuštění databáze

```bash
docker compose -f docker/docker-compose.yml up -d db
```

### Prisma a seed data

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

### Spuštění vývoje

Frontend a backend se spouštějí odděleně:

```bash
npm run dev:backend
npm run dev:frontend
```

Po spuštění:

- frontend běží na `http://localhost:5173`,
- backend API běží na `http://localhost:4000/api`,
- administrace je dostupná na `http://localhost:5173/admin`.

## 9. Seed data

Projekt obsahuje připravená demonstrační data:

- 1 administrátorský účet,
- týmy `A tým`, `B tým`, `U19`, `U17`, `U15`,
- ukázkové hráče,
- ukázkové zápasy,
- ukázkové články,
- ukázkové galerie.

Výchozí administrátorské přihlášení:

- email: `admin@aritma.cz`
- heslo: `Aritma123!`

## 10. Bezpečnost a validace

V projektu jsou použity základní bezpečnostní prvky:

- autentizace pomocí JWT,
- hashování hesel pomocí bcrypt,
- validace vstupních dat,
- middleware pro ošetření chyb a neplatných požadavků,
- oddělení veřejných a neveřejných operací.

## 11. Připravenost pro nasazení

Projekt obsahuje Dockerfile pro frontend i backend a také `docker-compose.yml`, takže je připravený pro snadnější lokální provoz i další nasazení.

Kompletní Docker stack lze spustit příkazem:

```bash
docker compose -f docker/docker-compose.yml up --build
```

## 12. Závěr

Projekt SK Aritma Praha Web splňuje požadavky na moderní webovou aplikaci s odděleným frontendem, backendem a databázovou vrstvou. Řešení umožňuje prezentaci klubu veřejnosti a zároveň poskytuje administraci pro správu obsahu.
