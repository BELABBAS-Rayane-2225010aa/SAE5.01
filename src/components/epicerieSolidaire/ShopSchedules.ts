import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Shop } from '../../models/shop';
import { useDate } from '../../composables/shopManagement/useDate';
import { style } from "../../styles/epicerieSolidaire/shopHour";

@customElement('solidary-grocery-shop-schedules')
export class SolidaryGroceryShopSchedules extends LitElement {
  // Define a property 'shop' of type Shop
  @property({ type: Object }) shop!: Shop;
  // Define a property 'week' of type Number
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
        <ul class="pl-10 animate__animated animate__fadeIn" ?hidden=${this.shop.currentWeek.number !== this.week}>
          ${this.shop.currentWeek.days.map((day, index) => html`
            <li class=${currentDay - 1 === index ? 'flex gap-2 font-bold relative' : 'flex gap-2 relative'}>
              <solidary-grocery-shop-day .day=${day} .index=${index} .weekNumber=${this.shop.currentWeek.number}></solidary-grocery-shop-day>
            </li>
          `)}
        </ul>
        <!-- Display the next week's schedule -->
        <ul class="pl-10 animate__animated animate__fadeIn" ?hidden=${this.shop.nextWeek.number !== this.week}>
          ${this.shop.nextWeek.days.map((day, index) => html`
            <li class=${currentDay - 1 === index ? 'flex gap-2 relative' : 'flex gap-2 relative'}>
              <solidary-grocery-shop-day .day=${day} .index=${index} .weekNumber=${this.shop.nextWeek.number}></solidary-grocery-shop-day>
            </li>
          `)}
        </ul>
        <!-- Display a message if no schedule is available -->
        <p ?hidden=${this.shop.currentWeek.number === this.week || this.shop.nextWeek.number === this.week}>Aucun horaire disponible</p>
      </div>
    `;
  }
}