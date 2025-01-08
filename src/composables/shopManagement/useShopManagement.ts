import moment from "moment";
import { DEFAULT_DAYS } from "../../constant/defaultValues";
import type { Day, Shop } from "../../models/shop";
import { useWeek } from "./useWeek";

type UseShopManagementReturn = {
  loadState: (shops: Shop[]) => Shop[];
};

/**
 * Provides functions to manage shop data, including loading state and days.
 *
 * @returns {UseShopManagementReturn} An object containing the loadState function.
 */
export const useShopManagement = (): UseShopManagementReturn => {
  const { currentWeekNumber } = useWeek();

  /**
   * Loads the default days for a week.
   *
   * @returns {Day[]} An array of default days.
   */
  const loadDefaultDays = (): Day[] => {
    return Array.from(
        { length: 7 },
        (_, index): Day => ({
          day: moment()
              .isoWeekday(index + 1)
              .format("dddd"), // Format the day name
          ...DEFAULT_DAYS,
        }),
    );
  };

  /**
   * Loads the days for a given shop and week.
   *
   * @param {Shop} shop - The shop object.
   * @param {number} currentWeek - The current week number.
   * @returns {Day[]} An array of days for the given shop and week.
   */
  const loadDays = (shop: Shop, currentWeek: number): Day[] => {
    if (shop.currentWeek.number === currentWeek) {
      return shop.currentWeek.days;
    } else if (shop.nextWeek.number === currentWeek) {
      return shop.nextWeek.days;
    } else {
      return loadDefaultDays();
    }
  };

  /**
   * Loads the state for an array of shops.
   *
   * @param {Shop[]} shops - An array of shop objects.
   * @returns {Shop[]} An array of shops with updated state.
   */
  const loadState = (shops: Shop[]): Shop[] => {
    return shops.map((shop: Shop) => ({
      ...shop,
      currentWeek: {
        number: currentWeekNumber,
        days: loadDays(shop, currentWeekNumber),
      },
      nextWeek: {
        number: currentWeekNumber + 1,
        days: loadDays(shop, currentWeekNumber + 1),
      },
    }));
  };

  // Return the loadState function
  return {
    loadState,
  };
};