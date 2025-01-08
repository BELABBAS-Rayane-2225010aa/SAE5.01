// FILE: api/weather.ts
import { fetchWeatherData } from '../../composables/weather/fetchWeatherData';
import { Weather } from '../../models/weather';

let cachedWeatherData: Weather | null = null;
let lastFetchTime: number | null = null;

export async function handleWeatherRequest() {
  const currentTime = Date.now();

  if (cachedWeatherData && lastFetchTime && (currentTime - lastFetchTime < 3 * 60 * 60 * 1000)) {
    return cachedWeatherData; // Return cached data if still valid
  }

  const config = getRuntimeConfig();
  const apikey = config.apiKey;
  const lat = 43.3186;
  const lon = 5.4084;

  try {
    cachedWeatherData = await fetchWeatherData(apikey, lat, lon);
    lastFetchTime = currentTime;
    return cachedWeatherData;
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo:", error);
    throw error;
  }
}

function getRuntimeConfig() {
  // Mock implementation, replace with actual runtime config retrieval
  return {
    apiKey: 'cbbd1d2b11c04e5ab691332586e1026e',
  };
}