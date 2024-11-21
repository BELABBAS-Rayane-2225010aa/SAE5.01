import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Shop } from '../models/shop';
import { User } from '../models/user';
import { EventPage } from '../models/event';
import { useAuth } from '../composables/auth/useAuth';
import '../components/custom-tabs';

@customElement('app-admin')
export class AppAdmin extends LitElement {
  @state() shops: Shop[] = [];
  @state() users: User[] = [];
  @state() events: EventPage[] = [];
  @state() items = [
    { label: 'Horaires' },
    { label: 'Evenements' }
  ];
  @state() selectedTab = 'Horaires';
  @state() isAdmin = false;
  @state() isLoading = true;

  static styles = css`
    /* Add your styles here */
  `;

  async connectedCallback() {
    super.connectedCallback();
    try {
      this.isAdmin = await useAuth.isAdmin();

      if (!this.isAdmin) {
        window.location.href = '/not-authorized';
        return;
      }

      const { ShopGet } = await import("../server/api/shop/shops.get");
      const shopResponse = new ShopGet();
      const shops: Shop[] = await shopResponse.get();
      this.shops = shops;

      this.fetchEvents();

      const { UserGet } = await import("../server/api/user/user.get");
      const userResponse = new UserGet();
      const users: User[] = await userResponse.get();
      this.users = users;

      if (this.isAdmin) {
        this.items.push({ label: 'Utilisateurs' });
      }
    } catch (error) {
      console.error('Error in shopsHandler:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async fetchEvents() {
    const { EventGet } = await import("../server/api/event/event.get");
    const eventResponse = new EventGet();
    const events: EventPage[] = await eventResponse.get();
    this.events = events;
  }

  updateEventList() {
    this.fetchEvents();
  }

  render() {
    if (!this.isAdmin) {
      return html`<p>Vous n'êtes pas autorisé à accéder à cette page.</p>`;
    }
    if (this.isLoading) {
      return html`
      <app-global-wrapper>
        <p>Chargement...</p>
      </app-global-wrapper>
      `;
    }

    return html`
      <app-global-wrapper>
        <h2>Administration</h2>
        <custom-tabs .items=${this.items} .selectedTab=${this.selectedTab} @tab-selected=${this.onTabSelected}>
          ${this.items.map(
            (item) => html`
              <div ?hidden=${this.selectedTab !== item.label}>
                ${item.label === 'Horaires' ? html`
                  <admin-shops-management .shops=${this.shops}></admin-shops-management>
                ` : ''}
                ${item.label === 'Evenements' ? html`
                  <admin-event-management .events=${this.events} @updateEventList=${this.updateEventList}></admin-event-management>
                ` : ''}
                ${item.label === 'Utilisateurs' && this.isAdmin ? html`
                  <admin-users-management .users=${this.users}></admin-users-management>
                ` : ''}
              </div>
            `
          )}
        </custom-tabs>
      </app-global-wrapper>
    `;
  }

  onTabSelected(event: CustomEvent) {
    this.selectedTab = event.detail.label;
  }
}