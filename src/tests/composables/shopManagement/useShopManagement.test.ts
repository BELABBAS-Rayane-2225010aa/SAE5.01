import { describe, it, expect, vi, afterEach } from "vitest";
import { useShopManagement } from "../../../composables/shopManagement/useShopManagement";
import type { Day, Shop } from "../../../models/calendar";

// Mock du hook `useWeek`
vi.mock("./useWeek", () => ({
  useWeek: () => ({
    currentWeekNumber: 4, // Exemple : semaine actuelle = 4
  }),
}));

describe("useShopManagement", () => {
  const { loadState } = useShopManagement(); // Accéder à la fonction publique loadState

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("loadState", () => {
    it("should update state for multiple shops", () => {
      const mockShops: Shop[] = [
        {
          name: "Shop 1",
          description: "First test shop.",
          address: "123 Main St",
          images: [],
          social: "@shop1",
          linkTree: "https://linktr.ee/shop1",
          currentWeek: { number: 3, days: [] },
          nextWeek: { number: 4, days: [] },
        },
        {
          name: "Shop 2",
          description: "Second test shop.",
          address: "456 Main St",
          images: [],
          social: "@shop2",
          linkTree: "https://linktr.ee/shop2",
          currentWeek: { number: 2, days: [] },
          nextWeek: { number: 3, days: [] },
        },
      ];

      const result = loadState(mockShops); // On appelle ici loadState pour tester son comportement

      expect(result).toHaveLength(2); // Deux magasins doivent être traités
      result.forEach((shop, index) => {
        expect(shop.currentWeek.number).toBe(4); // La semaine actuelle doit être 4
        expect(shop.nextWeek.number).toBe(5); // La semaine suivante doit être 5
        expect(shop.currentWeek.days).toBeDefined(); // Les jours de la semaine actuelle doivent être définis
        expect(shop.nextWeek.days).toBeDefined(); // Les jours de la semaine suivante doivent être définis
      });
    });
  });
});
