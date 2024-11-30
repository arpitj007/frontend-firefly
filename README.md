# Author

Gmail - [Arpit J](mailto:gddjngr@gmail.com)

## Packages

- React+TS
- Vite
- Sass
- Redux toolkit
- Axios
- ClassNames
- React intersection observer
- Redux

## Start with

Install `pnpm` if you don't have it already.

```sh
npm i -g pnpm
```

then

```sh
cd ~/{your-dir}/firefly/frontend
pnpm i
pnpm run dev
```

## What to expect?

This projected was bootstrapped in a few hours so the code quality is a bit compromized here and there.

- This app runs on http://localhost:5173
- Some nice techniques have been utilized to address complicated things e.g. Infinite scrolling works well with Search because scrolling down pulls the infinite scrolling identifier element to the top and triggers another API call.
- Favorite pokemon - You can mark any pokemon as favorite. I have created a backend Endpoint to list those pokemons but for now, for the sake of simplicity, We are pulling the favorite details only when a pokemon card is expanded.
- This project utilizes TypeScript with Custom DS elements. This allows us to build a beautiful standalone library for the frontend to reduce the load.
- Run `pnpm run analyze` to analyze the build size. Note that it will not run on production. I have attached a screenshot of the build in public folder.

```sh
# before running this command, uncomment the l:8 in vite.config.ts
 build: {
    sourcemap: true,
  },
```
