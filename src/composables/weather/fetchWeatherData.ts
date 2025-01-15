import type { Weather } from '../../models/weather';

export const fetchWeatherData = async (apiKey: string, lat: number, lon: number): Promise<Weather> => {
  // Send a GET request to the Weatherbit API with the provided latitude, longitude, and API key
  const response = await fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}&lang=fr&include=hourly`,
    {
      method: "GET",
    },
  );

  // Parse the JSON response data
  const data = await response.json();

  // Check if the response contains valid weather data
  if (data && data.data && data.data.length > 0) {
    // Extract the relevant weather data and map it to the Weather interface
    const weatherData: Weather = {
      cityName: data.data[0].city_name,
      temperatureValue: data.data[0].temp,
      temperatureDescription: data.data[0].weather.description,
      weatherIcon: [data.data[0].weather.icon],
      sunRise: data.data[0].sunrise,
      sunSet: data.data[0].sunset,
    };

    // Return the extracted weather data
    return weatherData;
  } else {
    // Throw an error if no weather data is found
    throw new Error("Aucune donnée météo trouvée");
  }
};