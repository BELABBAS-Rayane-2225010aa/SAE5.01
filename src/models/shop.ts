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

  export type Shop = {
    name: string;
    description: string;
    address: string;
    images: string[];
    social: string;
    linkTree: string;
    currentWeek: Week;
    nextWeek: Week;
  };

  export type Item = {
    label: string;
  } & Shop;