import { fetchWeatherData } from "~/composables/queries/weather/fetchWeatherData";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const apikey = config.apiKey;
    const lat = 43.3186;
    const lon = 5.4084;
  return await fetchWeatherData(lat, lon, apikey);
  
});