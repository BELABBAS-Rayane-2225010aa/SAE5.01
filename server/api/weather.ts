// Import the fetchWeatherData function from the specified path
import { fetchWeatherData } from "~/composables/queries/weather/fetchWeatherData";

// Define an event handler for the API endpoint
export default defineEventHandler(async (event) => {
    // Retrieve runtime configuration
    const config = useRuntimeConfig();

    // Extract the API key from the configuration
    const apikey = config.apiKey;
    
    // Define the latitude and longitude for the weather data request
    const lat = 43.3186;
    const lon = 5.4084;
    
    // Fetch the weather data using the API key, latitude, and longitude
    return await fetchWeatherData(apikey, lat, lon);
});