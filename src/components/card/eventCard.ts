import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EventPage } from '../../models/event';

@customElement('app-event-card')
export class EventCard extends LitElement {
  @property({ type: Object }) event: EventPage = {
    id: 0,
    title: '',
    description: '',
    images: '',
    links: '',
    date: '',
    time: '',
    location: '',
  };

  static styles = css`
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-4px);
    }
    .card img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    .card-content {
      padding: 16px;
    }
    .card-title {
      font-size: 1.2em;
      margin: 0 0 8px;
    }
    .card-date,
    .card-time,
    .card-location {
      font-size: 0.9em;
      color: #555;
      margin: 4px 0;
    }
    .card-link {
      display: block;
      margin-top: 8px;
      color: #007bff;
      text-decoration: none;
    }
    .card-link:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <div class="card">
        <img src="${this.event.images}" alt="${this.event.title}">
        <div class="card-content">
          <h3 class="card-title">${this.event.title}</h3>
          <p class="card-date">Date: ${this.event.date}</p>
          <p class="card-time">Time: ${this.event.time}</p>
          <p class="card-location">Location: ${this.event.location}</p>
          <a class="card-link" href="/event/${this.event.id}">Voir Plus</a>
        </div>
      </div>
    `;
  }
}