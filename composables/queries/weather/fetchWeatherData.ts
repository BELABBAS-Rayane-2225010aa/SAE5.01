// Import necessary modules and types
import type { Weather } from "~/models/weather";

// Function to fetch weather data from the API
export const fetchWeatherData = async (apiKey: string, lat: number, lon: number): Promise<Weather> => {
    // Construct the API URL with the provided latitude, longitude, and API key
    const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`,
        {
            method: "GET", // HTTP GET method
        },
    );
    
    // Parse the JSON response
    const data = await response.json();

    // Check if the response contains valid data
    if (data && data.data && data.data.length > 0) {
        // Map the API response to the Weather type
        const weatherData: Weather = {
            apiKey: apiKey,
            lon: data.data[0].lon,
            lat: data.data[0].lat,
            cityName: data.data[0].city_name,
            temperatureValue: data.data[0].temp.toString(),
            temperatureDescription: data.data[0].weather.description,
            weatherIcon: [data.data[0].weather.icon],
            sunRise: data.data[0].sunrise,
            sunSet: data.data[0].sunset,
        };
        
        // Return the mapped weather data
        return weatherData;
        
    } else {
        // Throw an error if no weather data is found
        throw new Error("Aucune donnée météo trouvée");
    }
};