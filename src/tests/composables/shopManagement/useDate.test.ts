import { describe, it, expect, vi, afterEach } from "vitest";
import moment from "moment";
import { useDate } from "../../../composables/shopManagement/useDate";

describe("useDate", () => {
  it("should return the current day of the week", () => {
    const mockDate = new Date("2025-01-23T12:00:00Z"); // Exemple d'une date fixe
    vi.setSystemTime(mockDate);

    const { currentDay } = useDate();
    expect(currentDay).toBe(moment(mockDate).day());
  });

  it("should return the current week of the year", () => {
    const mockDate = new Date("2025-01-23T12:00:00Z");
    vi.setSystemTime(mockDate);

    const { currentWeek } = useDate();
    expect(currentWeek).toBe(moment(mockDate).week());
  });

  it("should return the current hour in HH:mm format", () => {
    const mockDate = new Date("2025-01-23T14:45:00Z");
    vi.setSystemTime(mockDate);

    const { currentHour } = useDate();
    expect(currentHour).toBe(moment(mockDate).format("HH:mm"));
  });

  it("should return the current day index (0 = Monday, 6 = Sunday)", () => {
    const mockDate = new Date("2025-01-23T12:00:00Z"); // Un jeudi
    vi.setSystemTime(mockDate);

    const { currentDayIndex } = useDate();
    expect(currentDayIndex).toBe(moment(mockDate).day() - 1);
  });

  it("should handle edge cases for Sunday (day = 0)", () => {
    const mockDate = new Date("2025-01-26T12:00:00Z"); // Un dimanche
    vi.setSystemTime(mockDate);

    const { currentDayIndex } = useDate();
    expect(currentDayIndex).toBe(-1); // Dimanche (0) -> Index -1
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });
});
