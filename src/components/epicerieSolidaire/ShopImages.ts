import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Shop } from '../../models/shop';

@customElement('solidary-grocery-shop-images')
export class SolidaryGroceryShopImages extends LitElement {
  // Define a property 'shop' of type Shop
  @property({ type: Object }) shop!: Shop;

  // Define the styles for this component
  static styles = css`
    @import url("~/assets/css/solidaryGrocery/shopImages.css");
  `;

  // Render method to describe the component's template
  render() {
    return html`
      <div class="shop__images">
        <!-- Display the first shop image -->
        <nuxt-img class="shop__image" src=${this.shop.images[0]}></nuxt-img>
        <!-- Display the second shop image if available -->
        <nuxt-img class="shop__image" src=${this.shop.images[1] ?? ''}></nuxt-img>
      </div>
    `;
  }
}