import moment from "moment";

/**
 * This function returns the current day, week, hour, and day index.
 *
 * @returns {UseDateReturn} An object containing the current day, week, hour, and day index.
 */

type UseDateReturn = {
  currentDay: number;
  currentWeek: number;
  currentHour: string;
  currentDayIndex: number;
};

export const useDate = (): UseDateReturn => {
  // Get the current day of the week
  const currentDay: number = moment(new Date()).day();

  // Get the current week of the year
  const currentWeek: number = moment(new Date()).week();

  // Get the current hour in HH:mm format
  const currentHour: string = moment(new Date()).format("HH:mm");

  // Get the current day index (0-6, where 0 is Monday and 6 is Sunday)
  const currentDayIndex = moment(new Date()).day() - 1;

  // Return an object containing the current day, week, hour, and day index
  return { currentDay, currentWeek, currentHour, currentDayIndex };
};
