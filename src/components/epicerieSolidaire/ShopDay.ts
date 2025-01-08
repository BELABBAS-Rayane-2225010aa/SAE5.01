import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import moment from 'moment';
import { Day } from '../../models/shop';
import { useDate } from '../../composables/shopManagement/useDate';
import { style } from "../../styles/epicerieSolidaire/shopHour";

@customElement('solidary-grocery-shop-day')
export class SolidaryGroceryShopDay extends LitElement {
  @property({ type: Object }) day!: Day;
  @property({ type: Number }) index!: number;
  @property({ type: Number }) weekNumber!: number;

  static styles = [
    style
  ];

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

  render() {
    return html`
      <p>
        <span ?hidden=${!this.day.isOpen}>
          ${this.day.day} ${this.day.morningStart} - ${this.day.morningEnd}
          <span ?hidden=${!this.day.withBreak}>et ${this.day.afternoonStart} - ${this.day.afternoonEnd}</span>
        </span>
        <span ?hidden=${this.day.isOpen}>${this.day.day} <span class="text-red-500">fermé</span></span>
        <span class=${this.isCurrentlyOpen() ? 'text-green-500' : 'text-red-500'} ?hidden=${!(useDate().currentWeek === this.weekNumber && useDate().currentDayIndex === this.index)}>
          ${this.isCurrentlyOpen() ? " ouvert" : " fermé"}
        </span>
        <span ?hidden=${!(this.index === useDate().currentDayIndex && this.weekNumber === useDate().currentWeek)} class="ping absolute top-0 left-0 flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </p>
    `;
  }
}