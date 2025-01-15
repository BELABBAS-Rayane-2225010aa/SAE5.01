import { describe, it, expect, vi } from "vitest";
import { fetchWeatherData } from "../../composables/weather/fetchWeatherData";
import type { Weather } from "../../models/weather";

describe("fetchWeatherData", () => {
  const apiKey = "test_api_key";
  const lat = 48.8566; // Example latitude (Paris)
  const lon = 2.3522;  // Example longitude (Paris)

  it("should return weather data when the response is valid", async () => {
    const mockWeatherResponse = {
      data: [
        {
          city_name: "Paris",
          temp: 22.5,
          weather: { description: "Clear Sky", icon: "c01d" },
          sunrise: "06:00",
          sunset: "20:00",
        },
      ],
    };

    // Mocking the fetch API
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockWeatherResponse),
    });

    const expectedWeather: Weather = {
      cityName: "Paris",
      temperatureValue: 22.5,
      temperatureDescription: "Clear Sky",
      weatherIcon: ["c01d"],
      sunRise: "06:00",
      sunSet: "20:00",
    };

    const result = await fetchWeatherData(apiKey, lat, lon);

    expect(result).toEqual(expectedWeather);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}&lang=fr&include=hourly`,
      { method: "GET" }
    );
  });

  it("should throw an error when no weather data is returned", async () => {
    const mockEmptyResponse = { data: [] };

    // Mocking the fetch API
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockEmptyResponse),
    });

    await expect(fetchWeatherData(apiKey, lat, lon)).rejects.toThrow(
      "Aucune donnée météo trouvée"
    );
  });

  it("should throw an error when the fetch call fails", async () => {
    // Mocking fetch to simulate a failure
    global.fetch = vi.fn().mockRejectedValue(new Error("Network Error"));

    await expect(fetchWeatherData(apiKey, lat, lon)).rejects.toThrow(
      "Network Error"
    );
  });

  it("should throw an error when the response is malformed", async () => {
    const mockMalformedResponse = {};

    // Mocking the fetch API
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockMalformedResponse),
    });

    await expect(fetchWeatherData(apiKey, lat, lon)).rejects.toThrow(
      "Aucune donnée météo trouvée"
    );
  });
});
