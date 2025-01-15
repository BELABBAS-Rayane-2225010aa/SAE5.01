import { fetchWeatherData } from '../../composables/weather/fetchWeatherData';
import { Weather } from '../../models/weather';

let cachedWeatherData: Weather | null = null; // Cache to store weather data
let lastFetchTime: number | null = null; // Timestamp of the last fetch

// Function to handle weather data requests
export async function handleWeatherRequest() {
  const currentTime = Date.now(); // Get the current time

  // Check if cached data is still valid (within 3 hours)
  if (cachedWeatherData && lastFetchTime && (currentTime - lastFetchTime < 3 * 60 * 60 * 1000)) {
    return cachedWeatherData; // Return cached data if still valid
  }

  const config = getRuntimeConfig(); // Get runtime configuration
  const apikey = config.apiKey; // API key for the weather service
  const lat = 43.3186; // Latitude for the weather data
  const lon = 5.4084; // Longitude for the weather data

  try {
    // Fetch new weather data from the API
    cachedWeatherData = await fetchWeatherData(apikey, lat, lon);
    lastFetchTime = currentTime; // Update the last fetch time
    return cachedWeatherData; // Return the fetched weather data
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo:", error);
    throw error;
  }
}

// Function to get runtime configuration
function getRuntimeConfig() {
  // Mock implementation, replace with actual runtime config retrieval
  return {
    apiKey: 'cbbd1d2b11c04e5ab691332586e1026e', // Example API key
  };
}