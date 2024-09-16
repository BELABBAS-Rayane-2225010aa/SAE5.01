import type { SolarPanelTheoreticalProduction } from "~/models/weatherReport";
import moment from "moment/moment";
import type { Filters } from "~/models/chart/filters";

export function useEnergyChartData() {
  /**
   * Formats weather data based on the provided filters.
   *
   * @param {Filters} filters - The filters to apply to the weather data.
   * @returns {Promise<SolarPanelTheoreticalProduction[]>} The formatted weather data.
   */
  async function formatWeatherValue(filters: Filters) {
    let frequency, startDate, endDate;
    let solarPanelTheoreticalValue: SolarPanelTheoreticalProduction[];
    switch (filters.timeUnit) {
      case "QUARTER_OF_AN_HOUR":
        frequency = "hourly";
        startDate = moment(filters.startDate).add(1, "h").toDate();
        endDate = moment(filters.endDate).toDate();
        solarPanelTheoreticalValue = quarterHour(await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
        break;
      case "HOUR":
        frequency = "hourly";
        startDate = filters.startDate;
        endDate = moment(filters.endDate).add(1, "h").toDate();
        solarPanelTheoreticalValue = await callWeatherApi(startDate, endDate, frequency, 6.6, 1);
        break;
      case "DAY":
        frequency = "daily";
        startDate = filters.startDate;
        endDate = moment(filters.endDate).add(1, "day").toDate();
        solarPanelTheoreticalValue = await callWeatherApi(startDate, endDate, frequency, 6.6, 1);
        break;
      case "WEEK":
        frequency = "daily";
        startDate = moment(filters.startDate).startOf("isoWeek").toDate();
        endDate = moment(filters.endDate).add(1, "week").startOf("isoWeek").toDate();
        solarPanelTheoreticalValue = groupByDate(7, await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
        break;
      case "MONTH":
        frequency = "daily";
        startDate = moment(filters.startDate).startOf("month").toDate();
        endDate = moment(filters.endDate).add(1, "month").startOf("month").toDate();
        solarPanelTheoreticalValue = groupByDate(31, await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
        break;
      case "YEAR":
        frequency = "daily";
        startDate = moment(filters.startDate).startOf("year").toDate();
        endDate = moment(filters.endDate).add(1, "year").startOf("year").toDate();
        solarPanelTheoreticalValue = groupByDate(365, await callWeatherApi(startDate, endDate, frequency, 6.6, 1));
        break;
      default:
        frequency = "hourly";
        startDate = filters.startDate;
        endDate = moment(filters.endDate).add(1, "h").toDate();
        solarPanelTheoreticalValue = await callWeatherApi(startDate, endDate, frequency, 6.6, 1);
        break;
    }
    return solarPanelTheoreticalValue;
  }

  /**
   * Divides the hourly production values by 4 to get quarter-hour values.
   *
   * @param {SolarPanelTheoreticalProduction[]} value - The hourly production values.
   * @returns {SolarPanelTheoreticalProduction[]} The quarter-hour production values.
   */
  function quarterHour(value: SolarPanelTheoreticalProduction[]): SolarPanelTheoreticalProduction[] {
    let quarterHourValue: SolarPanelTheoreticalProduction[] = [];
    for (let i = 0; i < value.length; i++) {
      quarterHourValue.push({ date: value[i].date, production: value[i].production / 4 });
    }
    return quarterHourValue;
  }

  /**
   * Calls the weather API to fetch solar panel theoretical production data.
   *
   * @param {Date} startDate - The start date for the data.
   * @param {Date} endDate - The end date for the data.
   * @param {string} frequency - The frequency of the data (e.g., hourly, daily).
   * @param {number} nominalPower - The nominal power of the solar panel.
   * @param {number} performanceRatio - The performance ratio of the solar panel.
   * @returns {Promise<SolarPanelTheoreticalProduction[]>} The fetched data.
   */
  async function callWeatherApi(startDate: Date, endDate: Date, frequency: string, nominalPower: number, performanceRatio: number): Promise<SolarPanelTheoreticalProduction[]> {
    return await $fetch<SolarPanelTheoreticalProduction[]>(`/api/weatherReport?beginningDate=${formatDateTimeWeather(startDate)}&endDate=${formatDateTimeWeather(endDate)}&frequency=${frequency}&nominalPower=${nominalPower}&performanceRatio=${performanceRatio}`, {
      method: "GET",
    });
  }

  /**
   * Groups daily production values by a specified number of days.
   *
   * @param {number} numberDays - The number of days to group by.
   * @param {SolarPanelTheoreticalProduction[]} value - The daily production values.
   * @returns {SolarPanelTheoreticalProduction[]} The grouped production values.
   */
  function groupByDate(numberDays: number, value: SolarPanelTheoreticalProduction[]): SolarPanelTheoreticalProduction[] {
    let averageValue: SolarPanelTheoreticalProduction[] = [];
    let counter = 0;
    let sum;
    let date;
    while (counter < value.length) {
      sum = 0;
      date = formatDateTime(moment(value[counter].date).toDate());
      if (counter + numberDays > value.length) {
        numberDays = value.length - counter;
      }
      for (let i = 0; i < numberDays; i++) {
        sum += value[counter].production;
        counter++;
      }
      averageValue.push({ date: date, production: sum });
    }
    return averageValue;
  }

  /**
   * Formats a date to a string in the format "YYYY-MM-DD HH:mm:ss".
   *
   * @param {Date} date - The date to format.
   * @returns {string} The formatted date string.
   */
  function formatDateTime(date: Date): string {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
  }

  /**
   * Formats a date to a string in the format "YYYY-MM-DD:HH".
   *
   * @param {Date} date - The date to format.
   * @returns {string} The formatted date string.
   */
  function formatDateTimeWeather(date: Date): string {
    return moment(date).format("YYYY-MM-DD:HH");
  }

  return {
    formatDateTime,
    formatWeatherValue
  };
}