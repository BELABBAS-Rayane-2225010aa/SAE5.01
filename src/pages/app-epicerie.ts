import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { style } from '../styles/epicerieSolidaire/epicerieSolidaire';
import { Shop } from '../models/shop';

@customElement('app-epicerie')
export class EpicerieSolidaire extends LitElement {
  @state() shops: Shop[] = [];
  @state() isLoading = true;

  static styles = [
    style
  ];

  async connectedCallback() {
    super.connectedCallback();
    try {
      const response = await fetch('https://api-magasinconnecte.alwaysdata.net/src/endpoint/shops/get.php');
      if (response.ok) {
        const data = await response.json();
        this.shops = data;
      } else {
        console.error('Error in shopsHandler:', response);
      }
    } catch (error) {
      console.error('Error in shopsHandler:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  render() {
    if (this.isLoading) {
      return html`
      <app-global-wrapper>
        <p>Chargement...</p>
      </app-global-wrapper>
      `;
    }

    return html`
      <app-global-wrapper class="shop-wrapper">
        <main-title text="Epicerie solidaire"></main-title>
        <p class="introduction">
          La Fédération Aix-Marseille Interasso (FAMI) a été créée en 2012 pour défendre les droits des étudiants et
          améliorer leurs conditions de vie. Face à une précarité étudiante croissante révélée par une enquête, la FAMI a
          ouvert des épiceries solidaires AGORAé sur les campus d'Aix-Marseille, proposant des produits à bas prix et
          diverses activités. Un nouveau projet d'épicerie solidaire ouvrira fin 2023 au campus aixois, soutenu par des
          associations étudiantes et le réseau Alumni.
        </p>
        <solidary-grocery-tabs .shops=${this.shops}></solidary-grocery-tabs>
      </app-global-wrapper>
    `;
  }
}