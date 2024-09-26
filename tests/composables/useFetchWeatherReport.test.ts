import { useFetchWeatherReport } from "@/composables/useFetchWeatherReport"
import {describe, expect, it, vi} from "vitest"
import { parseWeatherData } from '~/models/weatherReport';
import type { WeatherDataRaw } from '~/models/weatherReport';

// Mock parseWeatherData function
vi.mock('~/models/weatherReport', () => {
  return {
    parseWeatherData: vi.fn(),
  };
});

// Mock $fetch for API requests
global.$fetch = vi.fn();

describe('useFetchWeatherReport', () => {
  const mockWeatherDataRaw: WeatherDataRaw = {
    data: [
      {
        datetime: '2023-09-21',
        solar_radiation: 5.5,
      },
      {
        datetime: '2023-09-22',
        solar_radiation: 6.0,
      },
    ],
  };

  const mockParsedWeatherData = [
    { date: '2023-09-21', solarRadiation: 5.5 },
    { date: '2023-09-22', solarRadiation: 6.0 },
  ];

  const mockSolarPanelInfo = {
    nominalPower: '400', // in watts
    performanceRatio: '0.8', // 80% efficiency
  };

  const mockQueryParams = {
    frequency: 'daily',
    beginningDate: '2023-09-21',
    endDate: '2023-09-22',
  };

  const mockApiKey = 'test-api-key';

  it('should fetch weather data and calculate theoretical solar panel production', async () => {
    // Mock the API response
    (global.$fetch as any).mockResolvedValueOnce(mockWeatherDataRaw);

    // Mock the parseWeatherData function
    (parseWeatherData as any).mockReturnValueOnce(mockParsedWeatherData);

    // Call the useFetchWeatherReport function
    const result = await useFetchWeatherReport({
      queryParams: mockQueryParams,
      apiKey: mockApiKey,
      solarPanelInfo: mockSolarPanelInfo,
    });

    // Expected theoretical production
    const expectedProduction = [
      {
        date: '2023-09-21',
        production: 5.5 * 400 * 0.8, // solarRadiation * nominalPower * performanceRatio
      },
      {
        date: '2023-09-22',
        production: 6.0 * 400 * 0.8,
      },
    ];

    // Assert that the result matches the expected production
    expect(result).toEqual(expectedProduction);

    // Assert that the API was called with the correct URL
    expect(global.$fetch).toHaveBeenCalledWith(
      'https://api.weatherbit.io/v2.0/history/daily?lat=43.3186&lon=5.4084&start_date=2023-09-21&end_date=2023-09-22&key=test-api-key',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    );

    // Assert that the parseWeatherData function was called with the raw API data
    expect(parseWeatherData).toHaveBeenCalledWith(mockWeatherDataRaw.data);
  });

  it('should handle an empty weather data response', async () => {
    // Mock an empty API response
    (global.$fetch as any).mockResolvedValueOnce({ data: [] });

    // Mock the parseWeatherData function to return an empty array
    (parseWeatherData as any).mockReturnValueOnce([]);

    // Call the useFetchWeatherReport function
    const result = await useFetchWeatherReport({
      queryParams: mockQueryParams,
      apiKey: mockApiKey,
      solarPanelInfo: mockSolarPanelInfo,
    });

    // Assert that the result is an empty array since there is no weather data
    expect(result).toEqual([]);

    // Assert that the parseWeatherData function was called with the empty array
    expect(parseWeatherData).toHaveBeenCalledWith([]);
  });
});