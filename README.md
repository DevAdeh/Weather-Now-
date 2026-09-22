# Weather Now

A simple weather app that shows current conditions for any city, built with HTML, CSS, and JavaScript using live data from the Open-Meteo API.

## Preview 
![article preview](./preview.png)

## Links

Solution link: [https://github.com/DevAdeh/Weather-Now-.git]

Live link: [https://multi-step-form-alpha-steel.vercel.app/]

## Features
- Search weather by city name
- Displays temperature, "feels like," humidity, and wind speed
- Loading state while fetching data
- Friendly error message if the city can't be found

## How it works
The app makes two API calls: first, it converts the city name you type into geographic coordinates (geocoding), then it uses those coordinates to fetch the current weather. Data is fetched asynchronously using `fetch()` and `async/await`, with `try/catch` handling any errors along the way (like an unrecognized city or a failed request).

## Tech used
- HTML
- CSS
- JavaScript (fetch API, async/await, error handling)
- [Open-Meteo API](https://open-meteo.com/) (free, no API key required)

## How to use
1. Clone or download this repo
2. Open `index.html` in your browser
3. Type a city name and hit Search

## Project structure

weather-now/
├── index.html
├── style.css
├── script.js
└── README.md

## Author
Adeola Ejikunle — [GitHub](https://github.com/DevAdeh)