# Welcome to Local-First Notion Clone

Using Prisma & Expo

## Get started

1. Install dependencies with pnpm

   ```bash
   pnpm install
   ```

2. prebuild app

   Haven't tested on Android yet!

   ```bash
    npx expo prebuild -p ios --clean && pnpm ios
   ```

You can create the database file and initial migration using Prisma migrate:

```bash
npx prisma@latest migrate dev
```

you can now generate the Prisma Client like this:

```bash
npx prisma@latest generate
```
