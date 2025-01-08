import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Shop } from '../../models/shop';
import { style } from "../../styles/epicerieSolidaire/shopHour";

@customElement('solidary-grocery-shop-images')
export class SolidaryGroceryShopImages extends LitElement {
  @property({ type: Object }) shop!: Shop;

  static styles = [
    style
  ];

  render() {
    return html`
      <div class="shop__images">
        <img class="shop__image" src=${this.shop.images[0]} alt="Shop image 1" >
        <img class="shop__image" src=${this.shop.images[1] ?? ''} alt="Shop image 2">
      </div>
    `;
  }
}