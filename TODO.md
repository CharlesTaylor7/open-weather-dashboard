## Tweaks
- Prevent duplicate entries
- Omit country specifier if U.S.
- min width, so chart & input box aren't so bouncy
- [ ] Dynamic options for x axis


## Shortlist
- [ ] DDDify the city search component state stuff
- [ ] Unit tests
- [ ] Rip out test ids, and e2e tests
- [ ] Author unit tests for the dashboard domain model 
- [ ] Gif recording of responsive screensize

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
