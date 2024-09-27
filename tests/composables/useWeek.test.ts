import { useWeek } from "@/composables/useWeek"
import {describe, expect, it, vi} from "vitest"
import moment from "moment";

// Mock moment
vi.mock("moment", () => () => ({
  isoWeek: () => 1,
  year: () => 2022,
}));

describe("useWeek", () => {
  it("should return the current week number and an array of weeks with their names and values", () => {
    const { weeks, currentWeekNumber } = useWeek();

    // Check the current week number is returned as expected
    expect(currentWeekNumber).toBe(1);

    // Check the array of weeks is returned as expected
    expect(weeks).toEqual([
      {
        name: "03/01/2022 au 09/01/2022",
        value: 1,
      },
      {
        name: "10/01/2022 au 16/01/2022",
        value: 2,
      },
    ]);
  });
});