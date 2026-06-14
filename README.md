# Eventify App

Frontend da plataforma **EventifyLab** — interface web para gestão e participação em eventos.

## Stack

- **React** + **Vite**
- **Nginx** (produção)
- **Docker** (multi-stage build)

## Estrutura

```
src/
  pages/
    Home.jsx      # Página principal
    Login.jsx     # Autenticação
  App.jsx
  main.jsx
```

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Produção (Docker)

```bash
docker compose up -d --build
```

O container `DK_EVENTIFY_APP` sobe na porta 80 interno e é exposto via Caddy em:
- https://eventifylab.com
- https://www.eventifylab.com

## Infraestrutura

- **Proxy reverso**: Caddy (`/root/docker-base/caddy_config/sites/eventify.caddy`)
- **Rede Docker**: `eventify_network` (externa)
- **Container**: `DK_EVENTIFY_APP`
