import { Week, Day } from '../../models/calendar';

const defaultDays: Day[] = [
  { day: 'Lundi', morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', isOpen: false, withBreak: false },
  { day: 'Mardi', morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', isOpen: false, withBreak: false },
  { day: 'Mercredi', morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', isOpen: false, withBreak: false },
  { day: 'Jeudi', morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', isOpen: false, withBreak: false },
  { day: 'Vendredi', morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', isOpen: false, withBreak: false },
  { day: 'Samedi', morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', isOpen: false, withBreak: false },
  { day: 'Dimanche', morningStart: '', morningEnd: '', afternoonStart: '', afternoonEnd: '', isOpen: false, withBreak: false },
];

const dayClean: Week = Object.freeze({ number: 0, days: defaultDays });

export function getDayClean(weekNumber: number): Week {
  const cleanWeek = JSON.parse(JSON.stringify(dayClean));
  cleanWeek.number = weekNumber;
  cleanWeek.days = defaultDays.map(day => ({ ...day }));
  return cleanWeek;
}