# Open Weather Dashboard
Powered by [Open Weather API](https://openweathermap.org/api), this dashboard lets you compare weather forecasts between cities across the world. 

Deployed to github pages: https://charlestaylor7.github.io/open-weather-dashboard


## CI/CD
Continuous Integration is implemented through Github actions.

Every push to `main` validates the projects linting, test suite, typescript, and prettier format.
If all the validation passes, the project is deployed to Github pages.
