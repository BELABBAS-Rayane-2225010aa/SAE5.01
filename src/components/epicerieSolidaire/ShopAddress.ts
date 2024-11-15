import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Item } from '~/models/shop';

@customElement('solidary-grocery-shop-address')
export class SolidaryGroceryShopAddress extends LitElement {
  @property({ type: Object }) item!: Item;

  static styles = css`
    @import url("~/assets/css/solidaryGrocery/shopHours.css");
  `;

  render() {
    return html`
      <div class="shop__address">
        <h3 class="font-bold"><icon name="i-heroicons-map-pin"></icon> Addresse :</h3>
        <div style="width: 100%; margin-top: 20px;">
          <iframe
            width="100%"
            height="200"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${encodeURIComponent(this.item.address)}+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
    `;
  }
}