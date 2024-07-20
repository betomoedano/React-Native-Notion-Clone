![NotionClone2](https://github.com/user-attachments/assets/3f94efd5-4c19-4aff-a7e0-3fdbcfefa407)
# Welcome to Local-First Notion Clone

Using Prisma & Expo

**Live demo at:** [x.com/betomoedano/status/1812483695418261620](https://x.com/betomoedano/status/1812483695418261620)

**YouTube, Source Code, Dependencies and More at:** [codewithbeto.dev/projects/notion-clone](https://codewithbeto.dev/projects/notion-clone)

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
