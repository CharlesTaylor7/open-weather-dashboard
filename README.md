# Open Weather Dashboard

This is a dashboard that uses Open Weather API to display weather conditions for nearly any city in the world.

This project is deployed to github pages: https://charlestaylor7.github.io/open-weather-dashboard


## CI/CD
Continuous Integration is implemented through Github actions.

Every push to `main` validates the projects linting, test suite, typescript, and prettier format.
If all the validation passed, the project is deployed to Github pages.

Since this a solo project the CI configuration is setup for `main` only. 
If this were a team project the CI, (but not the deployments), would be setup to run for Pull requests.

## Implementation Notes / Known Defects

In the interest of time, I elected to omit things that would be nice to have but weren't required.

- Temperatures are in Farenheit, can't request Celsius currently.
- The search query doesn't handle abbreviated state codes.
  e.g.
  "Chattanooga, Tennessee", or "Chattanooga" yields search results.
  "Chattanooga, TN" yields no results.


## Import style
JS relative imports can make code refactoring tricky.

So in the `tsconfig.json` & `vite.config.ts` files, I've setup a path alias for absolute imports.

`@/foo` resolves to an absolute import of `src/foo.ts`.
