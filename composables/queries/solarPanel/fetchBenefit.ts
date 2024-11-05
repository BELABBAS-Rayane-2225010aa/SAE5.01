import type { Benefit } from "~/models/solarPanel/benefit";

export const fetchBenefit = async (): Promise<Benefit> => {
  const config = useRuntimeConfig();
  const apiUrl = config.solarPanelApiUrl;
  const apiKey = config.solarPanelApiKey;
  const siteId = config.solarPanelSiteId;

  console.log(`Fetching from URL: ${apiUrl}/sites/${siteId}/envBenefits?systemUnits=Metrics`);

  return await $fetch<Benefit>(
    `${apiUrl}/sites/${siteId}/envBenefits?systemUnits=Metrics`,
    {
      method: "GET",
      headers: {
        "X-API-Key" : apiKey,
      },
    },
  );
}