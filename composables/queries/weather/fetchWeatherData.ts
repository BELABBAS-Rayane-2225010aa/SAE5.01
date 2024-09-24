import type { Weather } from "~/models/weather";

export const fetchWeatherData = async (lon: number, lat: number, apiKey: string): Promise<Weather> => {
    
    const response = await fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}&include=minutely&lang=fr
`,
        {
            method: "GET",
        },
    );
    return await response.json().then((data) => { console.log(data); return data; });
}