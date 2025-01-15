import type { SolarPanelTheoreticalProduction } from "../../models/photovoltaique/weatherReport";
import moment from "moment/moment";
import type { Filters } from "../../models/photovoltaique/filters";

export function useEnergyChartData() {
  // Function to format weather values based on the provided filters
  async function formatWeatherValue(filters: Filters): Promise<SolarPanelTheoreticalProduction[]> {
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

  // Function to adjust the production values for quarter-hour intervals
  function quarterHour(value: SolarPanelTheoreticalProduction[]): SolarPanelTheoreticalProduction[] {
    let quarterHourValue: SolarPanelTheoreticalProduction[] = [];
    for (let i = 0; i < value.length; i++) {
      quarterHourValue.push({ date: value[i].date, production: value[i].production / 4 });
    }
    return quarterHourValue;
  }

  // Function to call the weather API and fetch theoretical production values
  async function callWeatherApi(startDate: Date, endDate: Date, frequency: string, nominalPower: number, performanceRatio: number): Promise<SolarPanelTheoreticalProduction[]> {
    return await fetch(`/api/weatherReport?beginningDate=${formatDateTimeWeather(startDate)}&endDate=${formatDateTimeWeather(endDate)}&frequency=${frequency}&nominalPower=${nominalPower}&performanceRatio=${performanceRatio}`, {
      method: "GET",
    }).then(res => res.json());
  }

  // Function to group production values by date
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

  // Function to format date and time
  function formatDateTime(date: Date): string {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
  }

  // Function to format date and time for weather API
  function formatDateTimeWeather(date: Date): string {
    return moment(date).format("YYYY-MM-DD:HH");
  }

  return {
    formatDateTime,
    formatWeatherValue
  };
}