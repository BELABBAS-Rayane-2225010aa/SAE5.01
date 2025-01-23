export type Day = {
    day: string;
    withBreak: boolean;
    morningStart?: string;
    morningEnd?: string;
    afternoonStart?: string;
    afternoonEnd?: string;
    isOpen: boolean;
  };

  export type Week = {
    number: number;
    days: Day[];
  };

  export type Calendar = {
    year: number;
    weeks: Week[];
  };