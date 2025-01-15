import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { useWeek } from "../../composables/shopManagement/useWeek";
import { Shop } from "@/models/shop";

import '../custom-tabs';
import { style } from "../../styles/epicerieSolidaire/tabs";

@customElement('solidary-grocery-tabs')
export class SolidaryGroceryTabs extends LitElement {
  // Define a property 'shops' of type Shop array with default empty array
  @property({ type: Array }) shops: Shop[] = [];
  // Define a state variable 'week' to store the current week number
  @state() week: number = 0;

  // Define the styles for this component
  static styles = [
    style
  ];

  // Lifecycle method called when the component is added to the DOM
  connectedCallback() {
    super.connectedCallback();
    const { weeks } = useWeek();
    this.week = weeks[0].value;
  }

  // Render method to describe the component's template
  render() {
    return html`
      <custom-tabs
        .shops=${this.shops}
        class="shop__tabs"
        orientation="vertical"
        ui="{ wrapper: 'flex shops-start gap-10', list: { width: 'w-48' } }"
      >
        ${this.shops.map(shop => html`
          <div class="shop">
            <!-- Shop images component -->
            <solidary-grocery-shop-images .shop=${shop}></solidary-grocery-shop-images>
            <!-- Shop name -->
            <h3 class="font-bold">${shop.name}</h3>
            <!-- Shop description -->
            <p>${shop.description}</p>
            <!-- Social media links -->
            <u-button variant="link" .to=${shop.social} target="_blank" style="width: fit-content">⸱ Instagram</u-button>
            <u-button variant="link" .to=${shop.linkTree} target="_blank" style="width: fit-content">⸱ Autres liens</u-button>
            <!-- Week selection dropdown -->
            <p class="shop__select">
              Semaine :
              <u-select
                .value=${this.week}
                .options=${useWeek().weeks}
                option-attribute="name"
                value-attribute="value"
                icon="i-heroicons-calendar-days"
                @change=${(e: Event) => this.week = Number((e.target as HTMLSelectElement).value)}
              ></u-select>
            </p>
            <!-- Shop schedules component -->
            <solidary-grocery-shop-schedules .shop=${shop} .week=${this.week}></solidary-grocery-shop-schedules>
            <!-- Shop address component -->
            <solidary-grocery-shop-address .shop=${shop}></solidary-grocery-shop-address>
          </div>
        `)}
      </custom-tabs>
    `;
  }
}