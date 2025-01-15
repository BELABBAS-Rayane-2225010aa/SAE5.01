import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Shop } from '../../models/shop';
import { useWeek } from '../../composables/shopManagement/useWeek';
import { useToast } from '../../composables/useToast';
import { style } from '../../styles/admin/shopsManagement';

interface Item extends Shop {
  label: string;
}

// Define a new custom element with the name 'admin-shops-management'
@customElement('admin-shops-management')
export class ShopManagement extends LitElement {
  // Define a property 'shops' of type Shop array with default empty array
  @property({ type: Array }) shops: Shop[] = [];
  // Define state variables for managing week, loading state, shop number, and items
  @state() week: number = 0;
  @state() isLoading: boolean = false;
  @state() shopNumber: number = 0;
  @state() items: Item[] = [];

  // Apply the imported styles to this component
  static styles = style;

  // Lifecycle method called when the component is added to the DOM
  connectedCallback() {
    super.connectedCallback();
    this.initializeState();
  }

  // Initialize the state variables
  initializeState() {
    const { weeks } = useWeek();
    this.week = weeks[0].value;
    this.items = this.createItems(this.shops || []);
  }

  // Create items from the shops array
  createItems(shops: Shop[]): Item[] {
    return shops.map((shop: Shop) => ({
      label: shop.name,
      ...shop,
    }));
  }

  // Method to handle form submission
  async onSubmit(event: Event) {
    event.preventDefault();
    const shopsCopy = [...this.shops];

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

  // Method to update the shops
  async updateShops(shops: Shop[]) {
    try {
      const response = await fetch('https://api-magasinconnecte.alwaysdata.net/src/endpoint/shops/put.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shops),
      });
      if (!response.ok) {
        throw new Error('Error in updateShops');
      }
    } catch (error) {
      console.error('Error in updateShops:', error);
      throw error;
    }
  }

  // Render method to describe the component's template
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
            ${this.shops.length > 0 ? html`
              ${['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((dayName, index) => html`
                <li>
                  <admin-shop-management-day
                    .dayName=${dayName}
                    .day=${this.week === this.shops[this.shopNumber].currentWeek.number
                      ? this.shops[this.shopNumber].currentWeek.days[index]
                      : this.shops[this.shopNumber].nextWeek.days[index]}
                  ></admin-shop-management-day>
                </li>
              `)}
            ` : html`<p>Aucun magasin disponible.</p>`}
          </ul>
        </form>
      </div>
    `;
  }
}