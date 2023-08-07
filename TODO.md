## UI Functionality
- [ ] City Temperature Chart with dates/times on the x axis
- [ ] City Search Input
- [ ] Add to list button
- [ ] List of cities component
- [ ] Remove city from list
- [ ] Toggle between 3 day & 7 day forecast
- [ ] Toggle between chart & table view

## Testing
- [ ] End 2 end UI tests
- [ ] Unit tests

## Mprocs
- [ ] Use nodemon or something for linting & formatting
- [ ] Fix Jest code coverage command

## Eventual
- [ ] Move index.html to public/
- [ ] Handle api errors, 400, 429, 5xx, etc.
- [ ] Validate latitude & longitude before making api calls
- [ ] Responsive mobile layout
- [ ] DDDify the app

## Not Doing
- [ ] Implement simple express server to avoid leaking api key
- [ ] Reimplement deployments on fly.io because of the need for a server

## Ideas
- [ ] toggle between imperial & metric units

## Grading Criteria
Recommended practices:
- Domain Driven Design
- Single Responsibility
- Separation of Concerns
- Test Driven Development
- Responsive Design

Consideration questions:
Design:
- Does the site accomplish the requested functionality?
- Is the site easy to use?

API:
- gracefully handle errors
- gracefully handle loading states
- validation (lat & longitude ranges. anything else?)

Reusable:
- resuable modules, classes & components

Components
- Thoughtful component breakdown
- Thoughtful state management

Business Logic
- How and where is it implemented?
- Is it testable independent of the UI?
- How hard is it to extend? How easily could a month view be added?


## Notes
API NOTES
- You should apply units by default, unless you want temperature in Kelvins
- lang=en

Geocoding sample query:
https://api.openweathermap.org/geo/1.0/direct?q=chattanooga,TN,US&limit=5&appid={appid}&lang=en

Forecast data sample query:
https://api.openweathermap.org/data/3.0/onecall?lat=35&lon=-85&appid={appid}&lang=en