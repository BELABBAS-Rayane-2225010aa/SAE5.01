import { fetchBenefit } from "@/composables/queries/solarPanel/fetchBenefit";
import { describe, expect, it, vi } from "vitest";

// Mock pour `useRuntimeConfig` qui retourne les valeurs de configuration nécessaires
vi.mock("#app", () => ({
  useRuntimeConfig: () => ({
    solarPanelApiUrl: "https://api.example.com",
    solarPanelApiKey: "mocked-api-key",
    solarPanelSiteId: "mocked-site-id",
  }),
}));

// Mock partiel pour `vue`, en ne modifiant que `$fetch` et en gardant les autres exports d'origine
vi.mock("vue", async () => {
  // Import du module `vue` d'origine
  const vue = await vi.importActual("vue");

  return {
    ...vue, // Garde tous les exports originaux de `vue`
    $fetch: vi.fn(async () => ({
      // Simuler une réponse fictive correspondant à `Benefit`
      totalEnergy: 5000, // En kWh, par exemple
      co2Saved: 300,     // En kg, par exemple
    })),
  };
});

describe("fetchBenefit", () => {
  it("should fetch the benefits correctly with the correct API configuration", async () => {
    const benefit = await fetchBenefit();

    // Vérification de l'appel à `$fetch` avec l'URL et les en-têtes corrects
    expect($fetch).toHaveBeenCalledWith(
      "https://api.example.com/sites/mocked-site-id/envBenefits?systemUnits=Metrics",
      {
        method: "GET",
        headers: {
          "X-API-Key": "mocked-api-key",
        },
      }
    );

    // Vérification du retour des données simulées
    expect(benefit).toEqual({
      totalEnergy: 5000,
      co2Saved: 300,
    });
  });
});
