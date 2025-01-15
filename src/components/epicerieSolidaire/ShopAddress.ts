import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { style } from '../../styles/epicerieSolidaire/shopHour';
import { Shop } from '../../models/shop';

@customElement('solidary-grocery-shop-address')
export class SolidaryGroceryShopAddress extends LitElement {
  // Define a property 'shop' of type Shop
  @property({ type: Object }) shop!: Shop;


  // Define the styles for this component
  static styles = [
    style
  ];

  // Render method to describe the component's template
  render() {
    return html`
      <div class="shop__address">
        <!-- Shop address header -->
        <h3 class="font-bold"><icon name="i-heroicons-map-pin"></icon> Address :</h3>
        <div style="width: 100%; margin-top: 20px;">
          <!-- Google Maps iframe to display the shop location -->
          <iframe
            width="100%"
            height="200"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${encodeURIComponent(this.shop.address)}+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
    `;
  }
}