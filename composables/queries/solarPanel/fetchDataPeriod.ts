import type { DataPeriod } from "~/models/solarPanel/dataPeriod";

export const fetchDataPeriod = async (): Promise<DataPeriod> => {
  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  const response = await fetch(
    `${apiUrl}/sites/${siteId}/energy?resolution=lifetime`,
    {
      method: "GET",
      headers: {
        "X-API-Key" : "I4W1QU9682D0DK15CZT3Q6UBVPGOSRJY",
      },
    },
  );

  const data: {dataPeriod: DataPeriod} = await response.json();

  return data.dataPeriod;
}