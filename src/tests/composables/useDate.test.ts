import { useDate } from "../../composables/shopManagement/useDate"
import {describe, expect, it, vi} from "vitest"
import moment from "moment";

vi.mock("moment", () => {
  return {
    default: vi.fn(() => ({
      day: vi.fn(() => 3), // Mock current day (Wednesday)
      week: vi.fn(() => 42), // Mock current week (42nd week of the year)
      format: vi.fn(() => "14:30"), // Mock current time to be 14:30
    }))
  }
})
describe("useDate", () => {
  it("should return the correct current day, week, hour, and day index", () => {
    const { currentDay, currentWeek, currentHour, currentDayIndex } = useDate();

    expect(currentDay).toBe(3); // Wednesday
    expect(currentWeek).toBe(42); // 42nd week
    expect(currentHour).toBe("14:30"); // 14:30 time
    expect(currentDayIndex).toBe(2); // 3 (Wednesday) - 1 = 2
  })
})
