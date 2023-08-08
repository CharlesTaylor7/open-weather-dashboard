# Open Weather Dashboard

This is a dashboard that uses Open Weather API to display weather conditions for nearly any city in the world.


## CI/CD
Continuous Integration is implemented through Github actions.

Every push to `main` validates the projects linting, test suite, typescript, and prettier format.
If all the validation passed, the project is deployed to Github pages.

Since this a solo project the CI configuration is setup for `main` only. 
If this were a team project the CI, (but not the deployments), would be setup to run for Pull requests.

## Implementation Notes

As this is an MVP, I elected to omit things that are supported by the Open Weather API, but weren't requested in the project description:

- The first city matching the search terms is used. There is no way for the user to disambiguate results.
- Temperatures are in Farenheit, can't request Celsius currently.


## Import style
JS relative imports can make code refactoring tricky.

So in the `tsconfig.json` & `vite.config.ts` files, I've setup a path alias for absolute imports.

`@/foo` resolves to an absolute import of `src/foo.ts`.
