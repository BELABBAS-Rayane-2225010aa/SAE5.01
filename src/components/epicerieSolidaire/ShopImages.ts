import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Shop } from '../../models/shop';
import { style } from "../../styles/epicerieSolidaire/shopHour";

@customElement('solidary-grocery-shop-images')
export class SolidaryGroceryShopImages extends LitElement {
  // Define a property 'shop' of type Shop
  @property({ type: Object }) shop!: Shop;

  // Define the styles for this component
  static styles = [
    style
  ];

  // Render method to describe the component's template
  render() {
    return html`
      <div class="shop__images">
        <!-- Display the first shop image -->
        <img class="shop__image" src=${this.shop.images[0]} alt="Shop image 1" >
        <!-- Display the second shop image if available -->
        <img class="shop__image" src=${this.shop.images[1] ?? ''} alt="Shop image 2">
      </div>
    `;
  }
}