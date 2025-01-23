import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EventPage } from '../models/event';

@customElement('app-event-detail')
export class EventDetail extends LitElement {
  @state() event: EventPage | null = null;
  @state() isLoading = true;

  static styles = css`
      img {
          max-width: 30%;
      }
      .event-detail {
      padding: 16px;
      margin-top: 80px;
    }
    .event-detail img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
    .event-detail-content {
      padding: 16px;
    }
    .event-detail-title {
      font-size: 2em;
      margin: 0 0 16px;
    }
    .event-detail-date,
    .event-detail-time,
    .event-detail-location {
      font-size: 1em;
      color: #555;
      margin: 4px 0;
    }
    .event-detail-description {
      margin-top: 16px;
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    const pathSegments = window.location.pathname.split('/');
    const eventId = pathSegments[pathSegments.length - 1];
    if (eventId) {
      try {
        const response = await fetch(`https://api-magasinconnecte.alwaysdata.net/src/endpoint/events/get.php?id=${eventId}`);
        if (response.ok) {
          const data = await response.json();
          this.event = data;
        } else {
          console.error('Error fetching event details:', response);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        this.isLoading = false;
      }
    } else {
      console.error('Event ID not found in URL');
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

    if (!this.event) {
      return html`
        <app-global-wrapper>
          <p>Événement non trouvé.</p>
        </app-global-wrapper>
      `;
    }

    return html`
      <div class="event-detail">
        <img src="${this.event.images}" alt="${this.event.title}">
        <div class="event-detail-content">
          <h1 class="event-detail-title">${this.event.title}</h1>
          <p class="event-detail-date">Date: ${this.event.date}</p>
          <p class="event-detail-time">Time: ${this.event.time}</p>
          <p class="event-detail-location">Location: ${this.event.location}</p>
          <div class="event-detail-description">${this.event.description}</div>
        </div>
      </div>
    `;
  }
}