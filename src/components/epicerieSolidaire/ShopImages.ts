import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Item } from '../../models/shop';

@customElement('solidary-grocery-shop-images')
export class SolidaryGroceryShopImages extends LitElement {
  @property({ type: Object }) item!: Item;

  static styles = css`
    @import url("~/assets/css/solidaryGrocery/shopImages.css");
  `;

  render() {
    return html`
      <div class="shop__images">
        <nuxt-img class="shop__image" src=${this.item.images[0]}></nuxt-img>
        <nuxt-img class="shop__image" src=${this.item.images[1] ?? ''}></nuxt-img>
      </div>
    `;
  }
}