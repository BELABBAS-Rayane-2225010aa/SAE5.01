import moment from "moment";

type UseWeekReturn = {
  weeks: { name: string; value: number }[];
  currentWeekNumber: number;
};

/**
 * Returns the current week and the next week with their start and end dates.
 *
 * @returns {UseWeekReturn} An object containing the current week number and an array of weeks with their names and values.
 */
export const useWeek = (): UseWeekReturn => {
  // Get the current week number of the year
  const currentWeekNumber: number = moment(new Date()).isoWeek();
  // Get the current year
  const currentYear: number = moment(new Date()).year();

  /**
   * Gets the start and end dates of a given week number in a given year.
   *
   * @param {number} weekNumber - The week number.
   * @param {number} year - The year.
   * @returns {Object} An object containing the start and end dates of the week.
   */
  const getStartAndEndOfWeek = (weekNumber: number, year: number) => {
    const startOfWeek = moment()
        .year(year)
        .week(weekNumber)
        .startOf("week")
        .add(1, "day"); // Add 1 day to start from Monday
    const endOfWeek = moment()
        .year(year)
        .week(weekNumber)
        .endOf("week")
        .add(1, "day"); // Add 1 day to end on Sunday

    return {
      start: startOfWeek.format("DD/MM/YYYY"), // Format the start date
      end: endOfWeek.format("DD/MM/YYYY"), // Format the end date
    };
  };

  // Create an array of the current week and the next week with their start and end dates
  const weeks = [
    {
      name: `${getStartAndEndOfWeek(currentWeekNumber, currentYear).start} au ${getStartAndEndOfWeek(currentWeekNumber, currentYear).end}`,
      value: currentWeekNumber,
    },
    {
      name: `${getStartAndEndOfWeek(currentWeekNumber + 1, currentYear).start} au ${getStartAndEndOfWeek(currentWeekNumber + 1, currentYear).end}`,
      value: currentWeekNumber + 1,
    },
  ];

  // Return the current week number and the array of weeks
  return {
    weeks,
    currentWeekNumber,
  };
};