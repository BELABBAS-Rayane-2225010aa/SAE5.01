import { describe, it, expect, vi } from "vitest";
import moment from "moment";
import { useWeek } from "../../../composables/shopManagement/useWeek";

describe("useWeek", () => {
  describe("currentWeekNumber", () => {
    it("should return the correct current week number", () => {
      const currentWeekNumber = moment(new Date()).isoWeek();
      const { currentWeekNumber: result } = useWeek();

      expect(result).toBe(currentWeekNumber); // Vérifie que la semaine actuelle correspond à celle calculée par moment.js
    });
  });

  describe("getStartAndEndOfWeek", () => {
    it("should return correct start and end dates for the current week", () => {
      const currentYear = moment(new Date()).year();
      const currentWeekNumber = moment(new Date()).isoWeek();
      const { weeks } = useWeek();

      const currentWeek = weeks[0]; // La semaine actuelle est le premier élément du tableau

      const expectedStart = moment()
        .year(currentYear)
        .week(currentWeekNumber)
        .startOf("week")
        .add(1, "day") // Lundi
        .format("DD/MM/YYYY");

      const expectedEnd = moment()
        .year(currentYear)
        .week(currentWeekNumber)
        .endOf("week")
        .add(1, "day") // Dimanche
        .format("DD/MM/YYYY");

      expect(currentWeek.name).toContain(expectedStart); // Le nom de la semaine doit inclure la date de début
      expect(currentWeek.name).toContain(expectedEnd); // Le nom de la semaine doit inclure la date de fin
    });

    it("should return correct start and end dates for the next week", () => {
      const currentYear = moment(new Date()).year();
      const currentWeekNumber = moment(new Date()).isoWeek();
      const { weeks } = useWeek();

      const nextWeek = weeks[1]; // La semaine suivante est le deuxième élément du tableau

      const expectedStart = moment()
        .year(currentYear)
        .week(currentWeekNumber + 1)
        .startOf("week")
        .add(1, "day") // Lundi
        .format("DD/MM/YYYY");

      const expectedEnd = moment()
        .year(currentYear)
        .week(currentWeekNumber + 1)
        .endOf("week")
        .add(1, "day") // Dimanche
        .format("DD/MM/YYYY");

      expect(nextWeek.name).toContain(expectedStart); // Le nom de la semaine suivante doit inclure la date de début
      expect(nextWeek.name).toContain(expectedEnd); // Le nom de la semaine suivante doit inclure la date de fin
    });
  });

  describe("weeks array", () => {
    it("should return an array with two weeks", () => {
      const { weeks } = useWeek();

      expect(weeks).toHaveLength(2); // Il doit y avoir deux semaines (actuelle et suivante)
    });

    it("should have the correct week values for current and next week", () => {
      const currentYear = moment(new Date()).year();
      const currentWeekNumber = moment(new Date()).isoWeek();
      const { weeks } = useWeek();

      const currentWeek = weeks[0];
      const nextWeek = weeks[1];

      // Vérification des numéros de semaine
      expect(currentWeek.value).toBe(currentWeekNumber); // La semaine actuelle doit correspondre à currentWeekNumber
      expect(nextWeek.value).toBe(currentWeekNumber + 1); // La semaine suivante doit être currentWeekNumber + 1
    });
  });
});
