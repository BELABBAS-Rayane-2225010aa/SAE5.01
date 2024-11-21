// FILE: utils/fetchWeatherData.ts
import type { Weather } from '../../models/weather';

export const fetchWeatherData = async (apiKey: string, lat: number, lon: number): Promise<Weather> => {
  const response = await fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}&lang=fr&include=hourly`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  if (data && data.data && data.data.length > 0) {
    const weatherData: Weather = {
      cityName: data.data[0].city_name,
      temperatureValue: data.data[0].temp,
      temperatureDescription: data.data[0].weather.description,
      weatherIcon: [data.data[0].weather.icon],
      sunRise: data.data[0].sunrise,
      sunSet: data.data[0].sunset,
    };

    return weatherData;
  } else {
    throw new Error("Aucune donnée météo trouvée");
  }
};