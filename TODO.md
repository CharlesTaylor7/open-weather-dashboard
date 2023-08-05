- [x] Setup Jest
- [x] Setup Typescript path aliases
- [x] Setup Tailwind
- [x] Setup OpenWeather API account
- [ ] Make some test queries to the Geocoding & weather apis
- [ ] Move index.html to public/

## Mprocs
- [ ] Use nodemon or something for linting & formatting
- [ ] Fix Jest code coverage command

# Design
toggle between 3 day & 7 day forecast
toggle between imperial & metric units

API NOTES
- You should apply units by default, unless you want temperature in Kelvins
- lang=en

Geocoding sample query:
https://api.openweathermap.org/geo/1.0/direct?q=chattanooga,TN,US&limit=5&appid=32462e94fa616cc6f77157cc3c965959&lang=en

Forecast data sample query:
https://api.openweathermap.org/data/3.0/onecall?lat=35&lon=-8540&appid=32462e94fa616cc6f77157cc3c965959&lang=en

lat":35.0457219,"lon":-85.3094883
