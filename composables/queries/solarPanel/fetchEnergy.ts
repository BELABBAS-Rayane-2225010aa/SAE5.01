import type { Energy } from "~/models/solarPanel/energy";

export const fetchEnergy = async (
  resolution: string,
  startDate: string,
  endDate: string,
): Promise<Energy> => {
  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  const response = await fetch(
    `${apiUrl}/sites/${siteId}/energy?resolution=${resolution}&from=${startDate}&to=${endDate}`,
    {
      method: "GET",
      headers: {
        "X-API-Key" : "I4W1QU9682D0DK15CZT3Q6UBVPGOSRJY",
      },
    },
  );

  const data: { energy: Energy } = await response.json();

  return data.energy;
}