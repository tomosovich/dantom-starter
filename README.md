# DanTom Starter Kit



**_The goal of this starter is to let me skip the boilerplate
of many of the options I use in my projects. It is not meant
to be a complete solution for any project._**

## Getting Started
1. Clone this repo
2. Run `pnpm install`
3. Run `cp .env.example .env.local` to create a local environment file
4. Run `npx prisma db push` to push your models to the database
5. Run `pnpm run dev` to start the development server
6. Run `npx prisma studio` to start the Prisma Studio



## Features
- [Create Next App](https://nextjs.org/docs/getting-started)
- [TypeScript](https://www.typescriptlang.org/docs/handbook/react.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

## Configured Tools:
- [ESLint](https://eslint.org/docs/user-guide/getting-started) (mostly default from Next)
- [Prettier](https://prettier.io/docs/en/index.html) (including [sort-imports](https://github.com/IanVS/prettier-plugin-sort-imports))
- [Prisma ORM](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-typescript-postgres)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [NextAuth.js](https://next-auth.js.org/getting-started/example)

## Authentication
- Generic forms for login, signup, forgot password, etc.
- Form Validation through zod
- NextAuth.js with email credentials provider
- NextAuth.js with Google OAuth provider

## Some Choices I've made that you may do differently:
- I'm using named exports for everything except page and layouts, which require default exports.
- Components are organized by type and not feature. This is because I find it easier to find a component by type than by feature when working on smaller projects. I would refactor this for larger projects with multiple pages and features. I usually use a folder for each component or group and export from an index file.
- This starter includes support for a generic Postgres database. You can swap in any other database or use [Supabase](https://supabase.io/docs/guides/database) or [PlanetScale](https://planetscale.com) instead.

## Todo
- [ ] Add other OAuth providers to NextAuth.js
- [ ] Add Toasts for the different login options and errors
- [ ] Add light and dark mode support
- [ ] Enhanced password validation (strength, etc.)