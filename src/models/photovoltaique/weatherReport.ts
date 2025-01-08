import moment from "moment/moment";

// Define the shape of raw weather data
export type WeatherDataRaw = {
  data: WeatherDataDto[];
};

// Define the shape of individual weather data items in the raw format
export type WeatherDataDto = {
  datetime: string;     // Date and time in 'YYYY-MM-DD:HH' format
  t_solar_rad: number;  // Solar radiation measurement (primary)
  solar_rad: number;    // Solar radiation measurement (secondary, fallback)
};

// Define the shape of weather data after parsing
export type WeatherData = {
  date: string;
  solarRadiation: number;
};

// Define the shape of theoretical solar panel production data
export type SolarPanelTheoreticalProduction = {
  date: string;
  production: number;
}

// Function used to parse an array of raw weather data (WeatherDataDto) into a more usable format (WeatherData)
export function parseWeatherData(weatherDataDto: WeatherDataDto[]): WeatherData[] {
  return weatherDataDto.map((data) => {
    // Format the datetime from 'YYYY-MM-DD:HH' to 'YYYY-MM-DD HH:mm:ss'
    const formattedDate = moment(data.datetime, 'YYYY-MM-DD:HH').format("YYYY-MM-DD HH:mm:ss");

    // Return the transformed weather data object with formatted date and solar radiation value
    return {
      date: formattedDate,
      solarRadiation: data.t_solar_rad ?? data.solar_rad,   // Use t_solar_rad if available, otherwise fallback to solar_rad
    };
  });
}
