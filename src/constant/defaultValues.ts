import type { Day } from "../models/calendar";

export const DEFAULT_DAYS: Omit<Day, "day"> = {
  isOpen: false,
  withBreak: true,
  morningStart: "",
  morningEnd: "",
  afternoonStart: "",
  afternoonEnd: "",
};
