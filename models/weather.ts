export type Weather = {
    apiKey: string;
    lon: number;
    lat: number;
    cityName: string;
    temperatureValue: string;
    temperatureDescription: string;
    weatherIcon: string[];
    sunRise: string;
    sunSet: string;
};