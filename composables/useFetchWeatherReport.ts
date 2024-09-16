import type {WeatherData, WeatherDataRaw, SolarPanelTheoreticalProduction} from "~/models/weatherReport";
import {parseWeatherData} from "~/models/weatherReport";

export type SolarPanelInfo = {
    nominalPower: string;  // The nominal power of the solar panel
    performanceRatio: string; // The performance ratio of the solar panel
}

type UseFetchWeatherReport = {
    queryParams: {
        frequency: string;
        beginningDate: string;
        endDate: string;
    }
    apiKey: string;
    solarPanelInfo: SolarPanelInfo;
}

/**
 * Fetches weather data and calculates the theoretical production of a solar panel.
 *
 * @param {UseFetchWeatherReport} params - The parameters for fetching the weather report.
 * @param {string} apiKey The API key for the Weatherbit API.
 * @param {SolarPanelInfo} solarPanelInfo The information about the solar panel.
 * @returns {Promise<SolarPanelTheoreticalProduction[]>} The theoretical production data of the solar panel.
 */

export const useFetchWeatherReport = async ({queryParams, apiKey, solarPanelInfo}: UseFetchWeatherReport) => {
    // Fetch raw weather data from the API
    const weatherDataRaw = await $fetch<WeatherDataRaw>(
        `https://api.weatherbit.io/v2.0/history/${queryParams.frequency}?lat=43.3186&lon=5.4084&start_date=${queryParams.beginningDate}&end_date=${queryParams.endDate}&key=${apiKey}`,
        {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        }
    );

    // Parse the raw weather data into a more usable format
    const weatherData: WeatherData[] = parseWeatherData(weatherDataRaw.data);

    // Calculate the theoretical production of the solar panel based on the weather data
    const solarPanelTheoreticalProduction: SolarPanelTheoreticalProduction[] = weatherData.map((data) => ({
        date: data.date, // The date of the weather data
        production: data.solarRadiation * parseFloat(solarPanelInfo.nominalPower) * parseFloat(solarPanelInfo.performanceRatio), // The calculated production
    }));

    // Return the theoretical production data
    return solarPanelTheoreticalProduction;
}
