import { Instance, DayElement } from 'flatpickr/dist/types/instance';
import { Plugin } from 'flatpickr/dist/types/options';

function weekSelectPlugin(): Plugin {
  return function(fp: Instance) {
    function onReady() {
      if (fp.daysContainer) {
        fp.daysContainer.addEventListener('mouseover', onDayHover);
        fp.daysContainer.addEventListener('click', onDayClick);
      }
    }

    function onDayHover(event: MouseEvent) {
      const dayElem = event.target as DayElement;
      if (!dayElem.classList.contains('flatpickr-day')) return;

      const days = Array.from(fp.days.childNodes) as DayElement[];
      const dayIndex = days.indexOf(dayElem);
      const weekStart = dayIndex - (dayElem.$i % 7);
      const weekEnd = weekStart + 6;

      for (let i = 0; i < days.length; i++) {
        if (i >= weekStart && i <= weekEnd) {
          days[i].classList.add('inRange');
        } else {
          days[i].classList.remove('inRange');
        }
      }
    }

    function onDayClick(event: MouseEvent) {
      const dayElem = event.target as DayElement;
      if (!dayElem.classList.contains('flatpickr-day')) return;

      const days = Array.from(fp.days.childNodes) as DayElement[];
      const dayIndex = days.indexOf(dayElem);
      const weekStart = dayIndex - (dayElem.$i % 7);
      const weekEnd = weekStart + 6;

      for (let i = 0; i < days.length; i++) {
        if (i >= weekStart && i <= weekEnd) {
          days[i].classList.add('selected');
        } else {
          days[i].classList.remove('selected');
        }
      }

      const selectedDate = new Date(fp.currentYear, fp.currentMonth, dayElem.dateObj.getDate());
      fp.setDate(selectedDate, true);
    }

    return {
      onReady,
    };
  };
}

export default weekSelectPlugin;