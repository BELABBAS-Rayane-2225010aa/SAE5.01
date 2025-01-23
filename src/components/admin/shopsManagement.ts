import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Calendar, Week } from '../../models/calendar';
import { useToast } from '../../composables/useToast';
import { style } from '../../styles/admin/shopsManagement';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { French } from 'flatpickr/dist/l10n/fr.js';
import weekSelectPlugin from './weekSelectPlugin';
import { getDayClean } from './DayCleanType';

@customElement('admin-shops-management')
export class ShopManagement extends LitElement {
  @property({ type: Object }) calendar: Calendar = { year: 2021, weeks: [] };
  @state() week: number = 0;
  @state() isLoading: boolean = false;
  @state() weekStart: string = '';
  @state() weekEnd: string = '';
  @state() currentWeek: Week = getDayClean(0);

  static styles = style;

  connectedCallback() {
    super.connectedCallback();
    this.initializeState();
  }

  initializeState() {
    this.updateWeekRange(new Date());
    this.updateDays();
  }

  firstUpdated() {
    const weekPicker = this.shadowRoot!.querySelector('#weekPicker');
    if (weekPicker) {
      flatpickr(weekPicker, {
        locale: French,
        weekNumbers: true,
        defaultDate: new Date(),
        onChange: (selectedDates) => {
          this.updateWeekRange(selectedDates[0]);
          this.updateDays();
        },
        plugins: [weekSelectPlugin()],
      });
    }
  }

  getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
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

    // Update currentWeek based on the selected week number
    if (this.calendar.weeks) {
      this.currentWeek = this.calendar.weeks.find(week => week.number === this.week) || getDayClean(this.week);
    }
  }

  updateDays() {
    this.requestUpdate();
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const calendarCopy = { ...this.calendar, weeks: [...this.calendar.weeks] };

    // Add the current week to the calendar if it doesn't exist
    const existingWeek = calendarCopy.weeks.find(week => week.number === this.currentWeek.number);
    if (!existingWeek) {
      calendarCopy.weeks.push(this.currentWeek);
    }

    try {
      this.isLoading = true;
      await this.updateCalendar(calendarCopy);
      useToast.add({ title: 'Succès', description: 'Les horaires ont bien été enregistrés', color: 'green' });
    } catch (error) {
      console.error(error);
      useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de l\'enregistrement des horaires', color: 'red' });
    } finally {
      this.isLoading = false;
    }
  }

  async updateCalendar(calendar: Calendar) {
    try {
      const response = await fetch('https://api-magasinconnecte.alwaysdata.net/src/endpoint/calendar/put.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(calendar),
      });
      if (!response.ok) {
        throw new Error('Error in updateCalendar');
      }
    } catch (error) {
      console.error('Error in updateCalendar:', error);
      throw error;
    }
  }

  render() {
    return html`
      <div class="container">
        <h3>Gestion des horaires de l'épicerie solidaire</h3>

        <p class="shop__select">
          Semaine :
          <input id="weekPicker" type="text" placeholder="Choisir une semaine" />
          <span>${this.week} : du ${this.weekStart} au ${this.weekEnd}</span>
        </p>

        <div class="tabs">
          <button>${this.calendar.year}</button>
        </div>

        <form @submit=${this.onSubmit}>
          <button type="submit" ?disabled=${this.isLoading}>Enregistrer</button>
          <ul class="shop__ul">
            ${this.currentWeek.days.map((day, index) => html`
              <li>
                <admin-shop-management-day
                  .dayName=${['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'][index]}
                  .day=${day}
                ></admin-shop-management-day>
              </li>
            `)}
          </ul>
        </form>
      </div>
    `;
  }
}