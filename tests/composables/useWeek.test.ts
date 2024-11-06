import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import moment from 'moment';
import { useWeek } from '@/composables/useWeek'; // Adjust the path as needed

describe('useWeek', () => {
  // Set a fixed date for consistent testing (Monday, September 25, 2023)
  const mockDate = '2023-09-25T00:00:00Z';

  beforeAll(() => {
    // Set the system time to the mock date
    vi.setSystemTime(new Date(mockDate));
  });

  afterAll(() => {
    // Reset the system time after tests
    vi.useRealTimers();
  });

  it('should return the correct current week number', () => {
    const { currentWeekNumber } = useWeek();
    const expectedWeekNumber = moment(mockDate).isoWeek();

    expect(currentWeekNumber).toBe(expectedWeekNumber);
  });

  it('should return an array of weeks with the correct start and end dates for the current and next week', () => {
    const { weeks } = useWeek();
    const currentWeekNumber = moment(mockDate).isoWeek();
    const currentYear = moment(mockDate).year();

    // Calculate expected start and end dates for the current and next week
    const expectedCurrentWeek = {
      name: `${moment(mockDate).year(currentYear).week(currentWeekNumber).startOf('week').add(1, 'day').format('DD/MM/YYYY')} au ${moment(mockDate).year(currentYear).week(currentWeekNumber).endOf('week').add(1, 'day').format('DD/MM/YYYY')}`,
      value: currentWeekNumber,
    };

    const expectedNextWeek = {
      name: `${moment(mockDate).year(currentYear).week(currentWeekNumber + 1).startOf('week').add(1, 'day').format('DD/MM/YYYY')} au ${moment(mockDate).year(currentYear).week(currentWeekNumber + 1).endOf('week').add(1, 'day').format('DD/MM/YYYY')}`,
      value: currentWeekNumber + 1,
    };

    // Assert the structure and content of weeks array
    expect(weeks).toHaveLength(2);
    expect(weeks[0]).toEqual(expectedCurrentWeek);
    expect(weeks[1]).toEqual(expectedNextWeek);
  });
});
