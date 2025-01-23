import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Calendar, Week } from '../../models/calendar';
import { useDate } from '../../composables/shopManagement/useDate';
import { style } from "../../styles/epicerieSolidaire/shopHour";

@customElement('solidary-grocery-shop-schedules')
export class SolidaryGroceryShopSchedules extends LitElement {
  // Define a property 'shop' of type Shop
  @property({ type: Object }) calendar!: Calendar;
  // Define a property 'week' of type Number
  @property({ type: Number }) currentWeek!: Week;
  @property({ type: Number }) week!: number;

  // Define the styles for this component
  static styles = [
    style
  ];

  // Render method to describe the component's template
  render() {
    const { currentDay } = useDate();
    return html`
      <div class="shop__hours">
        <p class="font-bold">
          <icon name="i-heroicons-clock-16-solid"></icon> Horaires :
        </p>
        <!-- Display the current week's schedule -->
        <ul class="pl-10 animate__animated animate__fadeIn">
          ${this.currentWeek.days.map((day, index) => html`
            <li class=${currentDay - 1 === index ? 'flex gap-2 font-bold relative' : 'flex gap-2 relative'}>
              <p>
                <!-- Display the shop hours if open -->
                <span ?hidden=${!day.isOpen}>
                  ${day.day} ${day.morningStart} - ${day.morningEnd}
                  <span ?hidden=${!day.withBreak}>et ${day.afternoonStart} - ${day.afternoonEnd}</span>
                </span>
                <!-- Display 'closed' if the shop is not open -->
                <span ?hidden=${day.isOpen}>${day.day} <span class="text-red-500">fermé</span></span>
                <!-- Display a ping animation if today is the current day -->
                <span ?hidden=${!(index === useDate().currentDayIndex && this.week === useDate().currentWeek)} class="ping absolute top-0 left-0 flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              </p>
            </li>
          `)}
        </ul>
        <!-- Display a message if no schedule is available -->
        <p ?hidden=${this.currentWeek.days.length > 0} class="text-red-500">Aucun horaire disponible pour cette semaine</p>
      </div>
    `;
  }
}