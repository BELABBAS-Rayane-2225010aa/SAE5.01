import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { useWeek } from '../../composables/shopManagement/useWeek';
import { Item } from '~/models/shop';

@customElement('solidary-grocery-tabs')
export class SolidaryGroceryTabs extends LitElement {
  @property({ type: Array }) items: Item[] = [];
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
      <u-tabs
        .items=${this.items}
        class="shop__tabs"
        orientation="vertical"
        ui="{ wrapper: 'flex items-start gap-10', list: { width: 'w-48' } }"
      >
        ${this.items.map(item => html`
          <div class="shop">
            <solidary-grocery-shop-images .item=${item}></solidary-grocery-shop-images>
            <h3 class="font-bold">${item.name}</h3>
            <p>${item.description}</p>
            <u-button variant="link" .to=${item.social} target="_blank" style="width: fit-content">⸱ Instagram</u-button>
            <u-button variant="link" .to=${item.linkTree} target="_blank" style="width: fit-content">⸱ Autres liens</u-button>
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
            <solidary-grocery-shop-schedules .item=${item} .week=${this.week}></solidary-grocery-shop-schedules>
            <solidary-grocery-shop-address .item=${item}></solidary-grocery-shop-address>
          </div>
        `)}
      </u-tabs>
    `;
  }
}