import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import moment from 'moment';
import { Day } from '../../models/shop';
import { useDate } from '../../composables/shopManagement/useDate';
import { style } from "../../styles/epicerieSolidaire/shopHour";

@customElement('solidary-grocery-shop-day')
export class SolidaryGroceryShopDay extends LitElement {
  // Define a property 'day' of type Day
  @property({ type: Object }) day!: Day;
  // Define a property 'index' of type Number
  @property({ type: Number }) index!: number;
  // Define a property 'weekNumber' of type Number
  @property({ type: Number }) weekNumber!: number;


  // Define the styles for this component
  static styles = [
    style
  ];

  // Method to check if the shop is currently open
  isCurrentlyOpen() {
    const { currentHour, currentWeek, currentDayIndex } = useDate();
    if (currentWeek !== this.weekNumber || currentDayIndex !== this.index) {
      return false;
    }
    return (
      moment(currentHour, "HH:mm").isBetween(moment(this.day.morningStart, "HH:mm"), moment(this.day.morningEnd, "HH:mm"), undefined, "[]") ||
      moment(currentHour, "HH:mm").isBetween(moment(this.day.afternoonStart, "HH:mm"), moment(this.day.afternoonEnd, "HH:mm"), undefined, "[]")
    );
  }

  // Render method to describe the component's template
  render() {
    return html`
      <p>
        <!-- Display the shop hours if open -->
        <span ?hidden=${!this.day.isOpen}>
          ${this.day.day} ${this.day.morningStart} - ${this.day.morningEnd}
          <span ?hidden=${!this.day.withBreak}>et ${this.day.afternoonStart} - ${this.day.afternoonEnd}</span>
        </span>
        <!-- Display 'closed' if the shop is not open -->
        <span ?hidden=${this.day.isOpen}>${this.day.day} <span class="text-red-500">fermé</span></span>
        <!-- Display if the shop is currently open or closed -->
        <span class=${this.isCurrentlyOpen() ? 'text-green-500' : 'text-red-500'} ?hidden=${!(useDate().currentWeek === this.weekNumber && useDate().currentDayIndex === this.index)}>
          ${this.isCurrentlyOpen() ? " ouvert" : " fermé"}
        </span>
        <!-- Display a ping animation if today is the current day -->
        <span ?hidden=${!(this.index === useDate().currentDayIndex && this.weekNumber === useDate().currentWeek)} class="ping absolute top-0 left-0 flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </p>
    `;
  }
}