# Next.js coding exercise

## How to use

Install:

```sh
npm install
```

or:

```sh
yarn
```

Before run, make sure to create a environment variable `.env.local` with [Faker Books API](https://fakerapi.it/api/v1/books?_quantity=200) `DB_URL=https://fakerapi.it/api/v1/books?_quantity=200`

Run:

```sh
npm run dev
```

or 

```sh
yarn dev
```


Open application at: `http://localhost:3000`

<!-- #default-branch-switch -->

## The idea behind the exercise

The project uses [Next.js](https://github.com/zeit/next.js), which is a framework for server-rendered React apps.
It includes `@mui/material` and its peer dependencies, including `emotion`, the default style engine in MUI v5.

The objective: Write an application to implement a simple website that displays a list of 200 books retrieved from the sample [Faker Books API](https://fakerapi.it/api/v1/books?_quantity=200). 

Clicking on `genre` will filter the table and show only the selected value.

## Issues

[#4](https://github.com/jucasoliveira/momentive-ai-exercise/issues/4)


## The link component

Next.js has [a custom Link component](https://nextjs.org/docs/api-reference/next/link).

## What's next?

<!-- #default-branch-switch -->

You can check the application at [Vercel](https://momentive-ai-exercise.vercel.app/)