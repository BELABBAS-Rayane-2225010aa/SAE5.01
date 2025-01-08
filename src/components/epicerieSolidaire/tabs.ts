import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { useWeek } from '../../composables/shopManagement/useWeek';
import { Shop } from '../../models/shop';

import '../custom-tabs';

@customElement('solidary-grocery-tabs')
export class SolidaryGroceryTabs extends LitElement {
  @property({ type: Array }) shops: Shop[] = [];
  @state() week: number = 0;

  static styles = css`
    @import url("~/assets/css/solidaryGrocery/tabs.css");
  `;

  connectedCallback() {
    super.connectedCallback();
    const { weeks } = useWeek();
    this.week = weeks[0].value;
  }

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
            <solidary-grocery-shop-images .shop=${shop}></solidary-grocery-shop-images>
            <h3 class="font-bold">${shop.name}</h3>
            <p>${shop.description}</p>
            <u-button variant="link" .to=${shop.social} target="_blank" style="width: fit-content">⸱ Instagram</u-button>
            <u-button variant="link" .to=${shop.linkTree} target="_blank" style="width: fit-content">⸱ Autres liens</u-button>
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
            <solidary-grocery-shop-schedules .shop=${shop} .week=${this.week}></solidary-grocery-shop-schedules>
            <solidary-grocery-shop-address .shop=${shop}></solidary-grocery-shop-address>
          </div>
        `)}
      </custom-tabs>
    `;
  }
}