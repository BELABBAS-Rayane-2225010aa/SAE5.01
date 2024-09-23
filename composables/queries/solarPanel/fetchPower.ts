import type { Power } from '~/models/solarPanel/power';

export const fetchPower = async (
  resolution: string,
  startDate: string,
  endDate: string,
): Promise<Power> => {
  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  const response = await fetch(
    `${apiUrl}/sites/${siteId}/power?resolution=${resolution}&from=${startDate}&to=${endDate}`,
    {
      method: 'GET',
      headers: {
        "X-API-Key" : "I4W1QU9682D0DK15CZT3Q6UBVPGOSRJY",
      },
    },
  );

  const data: {power: Power} = await response.json();

  return data.power;
}