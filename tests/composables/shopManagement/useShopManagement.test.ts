import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useShopManagement } from '@/composables/shopManagement/useShopManagement';
import moment from 'moment';
import { DEFAULT_DAYS } from '~/constants/defaultValues';
import type { Shop, Day } from '~/models/shop';

// Mock the entire module of useWeek
vi.mock('@/composables/useWeek', () => ({
  useWeek: () => ({ currentWeekNumber: 1 }), // Default return value for the mock
}));

describe('useShopManagement', () => {
  let shopManagement: ReturnType<typeof useShopManagement>;
  const { useWeek } = require('@/composables/useWeek'); // Require the mocked module

  beforeEach(() => {
    vi.clearAllMocks();
    shopManagement = useShopManagement();
  });

  describe('loadDays', () => {
    const mockCurrentWeek = {
      number: 1,
      days: [{ day: 'Monday', ...DEFAULT_DAYS }, { day: 'Tuesday', ...DEFAULT_DAYS }]
    };
    const mockNextWeek = {
      number: 2,
      days: [{ day: 'Monday', ...DEFAULT_DAYS }, { day: 'Tuesday', ...DEFAULT_DAYS }]
    };
    const mockShop: Shop = {
      currentWeek: mockCurrentWeek,
      nextWeek: mockNextWeek,
    };

    it('should return current week days if shop week matches current week', () => {
      // Set up the mocked return value for current week
      useWeek.mockReturnValue({ currentWeekNumber: 1 });

      const result = shopManagement.loadState([mockShop])[0].currentWeek.days;
      expect(result).toEqual(mockCurrentWeek.days);
    });

    it('should return next week days if shop week matches next week', () => {
      useWeek.mockReturnValue({ currentWeekNumber: 2 });

      const result = shopManagement.loadState([mockShop])[0].nextWeek.days;
      expect(result).toEqual(mockNextWeek.days);
    });

    it('should return default days if no match for current or next week', () => {
      useWeek.mockReturnValue({ currentWeekNumber: 3 });

      const result = shopManagement.loadState([mockShop])[0].currentWeek.days;
      const defaultDays = Array.from({ length: 7 }, (_, index): Day => ({
        day: moment().isoWeekday(index + 1).format('dddd'),
        ...DEFAULT_DAYS,
      }));

      expect(result).toEqual(defaultDays);
    });
  });

  describe('loadState', () => {
    const mockCurrentWeek = {
      number: 1,
      days: [{ day: 'Monday', ...DEFAULT_DAYS }]
    };
    const mockNextWeek = {
      number: 2,
      days: [{ day: 'Tuesday', ...DEFAULT_DAYS }]
    };
    const mockShop: Shop = {
      currentWeek: mockCurrentWeek,
      nextWeek: mockNextWeek,
    };

    beforeEach(() => {
      useWeek.mockReturnValue({ currentWeekNumber: 1 });
    });

    it('should correctly update state with current and next week days', () => {
      const result = shopManagement.loadState([mockShop]);

      expect(result[0].currentWeek.number).toBe(1);
      expect(result[0].nextWeek.number).toBe(2);
      expect(result[0].currentWeek.days).toEqual(mockCurrentWeek.days);
      expect(result[0].nextWeek.days).toEqual(mockNextWeek.days);
    });

    it('should update state with default days if week numbers do not match', () => {
      useWeek.mockReturnValue({ currentWeekNumber: 3 });

      const result = shopManagement.loadState([mockShop]);
      const defaultDays = Array.from({ length: 7 }, (_, index): Day => ({
        day: moment().isoWeekday(index + 1).format('dddd'),
        ...DEFAULT_DAYS,
      }));

      expect(result[0].currentWeek.days).toEqual(defaultDays);
      expect(result[0].nextWeek.days).toEqual(defaultDays);
    });
  });
});
