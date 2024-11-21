import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Shop } from '../../models/shop';
import { useWeek } from '../../composables/shopManagement/useWeek';
import { useShopManagement } from '../../composables/shopManagement/useShopManagement';
import { useToast } from '../../composables/useToast';

import { style } from '../../styles/admin/shopsManagement';

interface Item extends Shop {
  label: string;
}

@customElement('admin-shops-management')
export class ShopManagement extends LitElement {
  @property({ type: Array }) shops: Shop[] = [];
  @state() week: number = 0;
  @state() isLoading: boolean = false;
  @state() shopNumber: number = 0;
  @state() state: Shop[] = [];
  @state() items: Item[] = [];

  static styles = style;

  connectedCallback() {
    super.connectedCallback();
    this.initializeState();
  }

  initializeState() {
    const { weeks } = useWeek();
    const { loadState } = useShopManagement();
    this.week = weeks[0].value;
    this.state = loadState(this.shops || []);
    this.items = this.createItems(this.shops || []);
  }

  createItems(shops: Shop[]): Item[] {
    return shops.map((shop: Shop) => ({
      label: shop.name,
      ...shop,
    }));
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const shopsCopy = [...this.state];

    try {
      this.isLoading = true;
      await this.updateShops(shopsCopy);
      useToast.add({ title: 'Succès', description: 'Les horaires ont bien été enregistrés', color: 'green' });
    } catch (error) {
      console.error(error);
      useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de l\'enregistrement des horaires', color: 'red' });
    } finally {
      this.isLoading = false;
    }
  }

  async updateShops(shops: Shop[]) {
    const { ShopUpdate } = await import("../../server/api/shop/shops.update");
    const response = new ShopUpdate();
    this.state = await response.update(shops);
  }

  render() {
    return html`
      <div class="container">
        <h3>Gestion des horaires de l'épicerie solidaire</h3>

        <p class="shop__select">
          Semaine :
          <select @change=${(e: Event) => this.week = Number((e.target as HTMLSelectElement).value)}>
            ${useWeek().weeks.map(week => html`<option value=${week.value}>${week.name}</option>`)}
          </select>
        </p>

        <div class="tabs">
          ${this.items.map((item, index) => html`
            <button @click=${() => this.shopNumber = index}>${item.label}</button>
          `)}
        </div>

        <form @submit=${this.onSubmit}>
          <button type="submit" ?disabled=${this.isLoading}>Enregistrer</button>

          <ul class="shop__ul">
            ${['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((dayName, index) => html`
              <li>
                <admin-shop-management-day
                  .dayName=${dayName}
                  .day=${this.week === this.state[this.shopNumber].currentWeek.number
                    ? this.state[this.shopNumber].currentWeek.days[index]
                    : this.state[this.shopNumber].nextWeek.days[index]}
                ></admin-shop-management-day>
              </li>
            `)}
          </ul>
        </form>
      </div>
    `;
  }
}