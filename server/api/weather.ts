// Import the fetchWeatherData function from the specified path
import { fetchWeatherData } from "~/composables/queries/weather/fetchWeatherData";
import { Weather } from "~/models/weather";

let cachedWeatherData: Weather | null = null;
let lastFetchTime: number | null = null;

// Define an event handler for the API endpoint
export default defineEventHandler(async (event) => {

    const currentTime = Date.now();

    if (cachedWeatherData && lastFetchTime && (currentTime - lastFetchTime < 3 * 60 * 60 * 1000)) {
        return cachedWeatherData; // Return cached data if still valid
    }
    // Retrieve runtime configuration
    const config = useRuntimeConfig();

    // Extract the API key from the configuration
    const apikey = config.apiKey;
    
    // Define the latitude and longitude for the weather data request
    const lat = 43.3186;
    const lon = 5.4084;
    
    try {
        // Fetch the weather data using the API key, latitude, and longitude
        cachedWeatherData = await fetchWeatherData(apikey, lat, lon);
        lastFetchTime = currentTime;
        return cachedWeatherData;
    } catch (error) {
        console.error("Erreur lors de la récupération des données météo:", error);
        throw error;
    }
});