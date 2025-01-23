import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { useWeek } from "../../composables/shopManagement/useWeek";
import { Calendar, Week } from "@/models/calendar";

import '../custom-tabs';
import { style } from "../../styles/epicerieSolidaire/tabs";

@customElement('solidary-grocery-tabs')
export class SolidaryGroceryTabs extends LitElement {
  @property({ type: Array }) calendar: Calendar = { year: 2021, weeks: [] };
  @state() week: number = 0;
  @state() weekStart: string = '';
  @state() weekEnd: string = '';
  @state() currentWeek: Week = { number: 0, days: [] };

  static styles = [
    style
  ];

  connectedCallback() {
    super.connectedCallback();
    const { weeks } = useWeek();
    this.week = weeks[0].value;
    this.updateWeekRange(new Date());
  }

  updateWeekRange(date: Date) {
    const weekNumber = this.getWeekNumber(date);
    this.week = weekNumber;
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    this.weekStart = startOfWeek.toLocaleDateString('fr-FR');
    this.weekEnd = endOfWeek.toLocaleDateString('fr-FR');

    if (this.calendar.weeks) {
      this.currentWeek = this.calendar.weeks.find(week => week.number === this.week) || { number: 0, days: [] };
    }
  }

  getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  render() {
    return html`
      <custom-tabs
        .shops=${this.calendar}
        class="shop__tabs"
        orientation="vertical"
        ui="{ wrapper: 'flex shops-start gap-10', list: { width: 'w-48' } }"
      >
        <div class="shop">
          <!-- Week selection dropdown -->
          <p class="shop__select">
            Semaine : ${this.week} - du ${this.weekStart} au ${this.weekEnd}
          </p>
          <!-- Shop schedules component -->
          <solidary-grocery-shop-schedules .calendar=${this.calendar} .currentWeek=${this.currentWeek} .week=${this.week}></solidary-grocery-shop-schedules>
          <!-- Shop address component -->
          <solidary-grocery-shop-address .calendar=${this.calendar}></solidary-grocery-shop-address>
        </div>
      </custom-tabs>
    `;
  }
}