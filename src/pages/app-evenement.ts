import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EventPage } from '../models/event';
import '../components/card/eventCard';

@customElement('app-evenement')
export class Evenement extends LitElement {
  @state() events: EventPage[] = [];
  @state() isLoading = true;
  @state() searchQuery: string = '';
  @state() visibleEventsCount: number = 10;

  static styles = css`
    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      padding: 16px;
    }
    .search-bar {
      margin: 16px;
      display: flex;
      justify-content: center;
    }
    .search-bar input {
      width: 100%;
      max-width: 400px;
      padding: 8px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-top: 80px;
    }
    .show-more-container {
      display: flex;
      justify-content: center;
      margin-top: 16px;
    }
    .show-more-button {
      padding: 8px 16px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
    .show-more-button:hover {
      background-color: #0056b3;
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
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
    } finally {
      this.isLoading = false;
    }
  }

  handleSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.visibleEventsCount = 10; // Reset visible events count on search
  }

  showMoreEvents() {
    this.visibleEventsCount += 10;
  }

  render() {
    if (this.isLoading) {
      return html`
        <app-global-wrapper>
          <p>Chargement...</p>
        </app-global-wrapper>
      `;
    }

    const filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(this.searchQuery) ||
      event.description.toLowerCase().includes(this.searchQuery)
    );

    return html`
      <div>
        <!-- Search bar -->
        <div class="search-bar">
          <input
            type="text"
            placeholder="Rechercher un événement"
            @input=${this.handleSearch}
          />
        </div>

        <!-- Grid of events -->
        <div class="events-grid">
          ${filteredEvents.slice(0, this.visibleEventsCount).map(event => html`
            <app-event-card .event=${event}></app-event-card>
          `)}
        </div>

        <!-- Show more button -->
        ${this.visibleEventsCount < filteredEvents.length ? html`
          <div class="show-more-container">
            <button class="show-more-button" @click=${this.showMoreEvents}>Afficher plus</button>
          </div>
        ` : ''}
      </div>
    `;
  }
}