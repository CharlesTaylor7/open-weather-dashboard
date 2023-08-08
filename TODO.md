## Tweaks
- [ ] Day range doesn't work
- Prevent duplicate entries
- Omit country specifier if U.S.
- Format the dates on the table view
- min width, so chart & input box aren't so bouncy

- [ ] Loading spinner

## Shortlist
- [x] Setup tooling
- [x] Setup CI/CD deployments to github pages
- [x] Initial exploration of the apex chart API
- [x] Initial exploration of open weather API
- [x] Design a mockup of the site, and present it to others for feedback
- [x] Build a static version of the site
- [x] Dynamic views: day range, & table/chart
- [x] Table view should show dates
- [ ] Rip out test ids, and e2e tests
- [ ] Author unit tests for the dashboard domain model 
- [ ] Gif recording of responsive screensize

## UI Functionality
- [x] City Temperature Chart with dates/times on the x axis
- [x] Table view for Temperatures
- [x] City Search Input
- [x] Add to list button
- [x] List of cities component
- [x] Remove city from list
- [x] Toggle between 3 day & 7 day forecast
- [x] Toggle between chart & table view

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
- [ ] DDDify the app
- [ ] Allow the user to pick between ambiguous city search results. Example: "London"

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
