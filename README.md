# Open Weather Dashboard

This is a dashboard that uses Open Weather API to display weather conditions for nearly any city in the world.

This project is deployed to github pages: https://charlestaylor7.github.io/open-weather-dashboard


## CI/CD
Continuous Integration is implemented through Github actions.

Every push to `main` validates the projects linting, test suite, typescript, and prettier format.
If all the validation passes, the project is deployed to Github pages.
