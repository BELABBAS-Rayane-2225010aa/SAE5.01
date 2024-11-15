import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Shop } from '../models/shop';

type Item = {
  label: string;
} & Shop;

@customElement('app-epicerie')
export class EpicerieSolidaire extends LitElement {
  @state() items: Item[] = [];

  static styles = css`
    @import url("~/assets/css/solidaryGrocery.css");
  `;

  async connectedCallback() {
    try {
      const response = await fetch("../server/api/shop/shops", { method: "GET" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const shops: Shop[] = await response.json();
      this.items = this.createItems(shops);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  }

  createItems(shops: Shop[]): Item[] {
    return shops.map((shop: Shop) => ({
      label: shop.name,
      ...shop,
    }));
  }

  render() {
    return html`
      <global-wrapper class="shop-wrapper">
        <main-title text="Epicerie solidaire"></main-title>
        <p class="introduction">
          La Fédération Aix-Marseille Interasso (FAMI) a été créée en 2012 pour défendre les droits des étudiants et
          améliorer leurs conditions de vie. Face à une précarité étudiante croissante révélée par une enquête, la FAMI a
          ouvert des épiceries solidaires AGORAé sur les campus d'Aix-Marseille, proposant des produits à bas prix et
          diverses activités. Un nouveau projet d'épicerie solidaire ouvrira fin 2023 au campus aixois, soutenu par des
          associations étudiantes et le réseau Alumni.
        </p>
        <solidary-grocery-tabs .items=${this.items}></solidary-grocery-tabs>
      </global-wrapper>
    `;
  }
}