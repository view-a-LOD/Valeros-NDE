# Valeros (NDE pilot)

> ⚠️ **This project is currently in active development and not yet ready for production use.**

## Architecture

This is an [Nx](https://nx.dev/) monorepo containing:

- **`apps/api`** - [NestJS](https://nestjs.com/) backend API for querying SPARQL endpoints (uses [LDkit](https://ldkit.io/) as a Linked Data query toolkit, [Comunica](https://comunica.dev/) as a query engine, [Swagger](https://swagger.io/) for API documentation)
- **`apps/web`** - [Angular](https://angular.dev/) frontend (uses [TailwindCSS](https://tailwindcss.com/) as a CSS framework and [DaisyUI](https://daisyui.com/) as a component library)
- **`libs/shared-types`** - Shared TypeScript types and schemas used across the monorepo

## Installation

```bash
pnpm install
```

## Development

Run backend/API and frontend concurrently:

```bash
pnpm dev
```

- API: http://localhost:3000/api/docs
- Frontend: http://localhost:4200

Or run them separately:

```bash
pnpm dev:api

pnpm dev:web
```
