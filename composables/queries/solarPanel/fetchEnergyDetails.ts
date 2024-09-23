import type { EnergyDetails } from "~/models/solarPanel/energyDetails";

export const fetchEnergyDetails = async (
  serialNumber: string,
): Promise<EnergyDetails> => {
  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  const response = await fetch(
    `${apiUrl}/sites/${siteId}/meters/${serialNumber}/export-energy`,
    {
      method: "GET",
      headers: {
        "X-API-Key" : "I4W1QU9682D0DK15CZT3Q6UBVPGOSRJY",
      },
    },
  );

  const data: { energyDetails: EnergyDetails } = await response.json();

  return data.energyDetails;
}