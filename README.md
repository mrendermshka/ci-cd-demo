# CI/CD Demo

Навчальний проєкт для уроку про CI/CD з GitHub Actions.

## Запуск

```bash
npm install
cp .env.example .env
npm start
```

## Команди

| Команда | Що робить |
|---|---|
| `npm start` | запускає сервер на http://localhost:3000 |
| `npm test` | запускає тести (Jest + Supertest) |
| `npm run lint` | перевіряє код ESLint |

## CI/CD

- `.github/workflows/ci.yml` — на кожен PR і push у `main`: встановлення, lint, тести.
- `.github/workflows/deploy.yml` — після злиття в `main` викладає папку `public` на GitHub Pages.
