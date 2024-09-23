import type { Overview } from '~/models/solarPanel/overview';
import { parseOverview } from "~/models/solarPanel/overview";

export const fetchOverview = async (
  startDate: string,
  endDate: string,
): Promise<Overview> => {

  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  const response = await fetch(
    `${apiUrl}/sites/${siteId}/overview?from=${startDate}to${endDate}`,
    {
      method: 'GET',
      headers: {
        "X-API-Key" : "I4W1QU9682D0DK15CZT3Q6UBVPGOSRJY",
      },
    },
  );

  const data = await response.json();

  return parseOverview(data);
}