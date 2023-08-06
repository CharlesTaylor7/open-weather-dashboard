- [x] Setup Jest
- [x] Setup Typescript path aliases
- [x] Setup Tailwind
- [x] Setup OpenWeather API account
- [x] Geocoding api call 
- [x] Forecast API call 
- [x] Use local storage to cache OpenWeather queries
- [x] Check if open weather calls can be made without violating google chromes' CORS detection
- [ ] Learn apex chart
- [ ] Move index.html to public/


## Mprocs
- [ ] Use nodemon or something for linting & formatting
- [ ] Fix Jest code coverage command

## Not Doing
- [ ] Implement simple express server to avoid leaking api key
- [ ] Reimplement deployments on fly.io because of the need for a server

# Design
toggle between 3 day & 7 day forecast
toggle between imperial & metric units

API NOTES
- You should apply units by default, unless you want temperature in Kelvins
- lang=en

Geocoding sample query:
https://api.openweathermap.org/geo/1.0/direct?q=chattanooga,TN,US&limit=5&appid=32462e94fa616cc6f77157cc3c965959&lang=en

Forecast data sample query:
https://api.openweathermap.org/data/3.0/onecall?lat=35&lon=-85&appid=32462e94fa616cc6f77157cc3c965959&lang=en

