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

      this.fetchShops();

      this.fetchEvents();

      this.fetchUsers();

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

  async fetchShops() {
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
    }
  }

  async fetchEvents() {
    try {
      const response = await fetch('https://api-magasinconnecte.alwaysdata.net/src/endpoint/events/get.php');
      if (response.ok) {
        const data = await response.json();
        this.events = data;
      } else {
        console.error('Error in eventsHandler:', response);
      }
    } catch (error) {
      console.error('Error in eventsHandler:', error);
      throw error;
    }
  }

  async fetchUsers() {
    try {
      const response = await fetch('https://api-magasinconnecte.alwaysdata.net/src/endpoint/users/get.php');
      if (response.ok) {
        const data = await response.json();
        this.users = data;
      } else {
        console.error('Error in usersHandler:', response);
      }
    } catch (error) {
      console.error('Error in usersHandler:', error);
      throw error;
    }
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