import type { Weather } from "~/models/weather";

export const fetchWeatherData = async (lon: number, lat: number, apiKey: string): Promise<Weather> => {
    
    const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}&include=minutely&lang=fr
`,
        {
            method: "GET",
        },
    );
    
    const data = await response.json();

    if (data && data.data && data.data.length > 0) {
        // Mapper les données au modèle Weather
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
        
        return weatherData;
        
    } else {
        throw new Error("Aucune donnée météo trouvée");
    }

};