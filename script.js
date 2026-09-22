const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const weatherCard = document.getElementById('weatherCard');

// Maps Open-Meteo's numeric weather codes to plain-English descriptions
const weatherCodes = {
  0: "Clear sky", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Foggy", 48: "Foggy", 51: "Light drizzle", 61: "Light rain",
  63: "Rain", 65: "Heavy rain", 71: "Light snow", 80: "Rain showers",
  95: "Thunderstorm"
};

searchForm.addEventListener('submit', async function (e) {
  e.preventDefault(); // stop page reload
  const city = cityInput.value.trim();
  if (!city) return;

  // Reset view before starting a new search
  errorMessage.classList.add('hidden');
  weatherCard.classList.add('hidden');
  loading.classList.remove('hidden');

  try {
    // 1. Turn the city name into coordinates (geocoding step)
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`Couldn't find "${city}". Try checking the spelling.`);
    }

    const { latitude, longitude, name } = geoData.results[0];

    // 2. Fetch the actual weather using those coordinates
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`
    );
    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    // 3. Display it
    document.getElementById('cityName').textContent = name;
    document.getElementById('temperature').textContent = `${Math.round(current.temperature_2m)}°C`;
    document.getElementById('condition').textContent = weatherCodes[current.weather_code] || "Unknown conditions";
    document.getElementById('feelsLike').textContent = `${Math.round(current.apparent_temperature)}°C`;
    document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
    document.getElementById('wind').textContent = `${Math.round(current.wind_speed_10m)} km/h`;

    weatherCard.classList.remove('hidden');

  } catch (err) {
    errorMessage.textContent = err.message || "Something went wrong. Please try again.";
    errorMessage.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden'); // always hide loading, success or fail
  }
});