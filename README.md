## Getting Started

Install dependencies:

```bash
yarn
# or
npm install
```

Copy the .env.example file to .env

Fill in all variables in the .env file

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Generate migration

```bash
yarn typeorm migration:generate -d ./src/data-source.ts ./src/migrations/{{NAME_OF_MIGRATION}}
```
