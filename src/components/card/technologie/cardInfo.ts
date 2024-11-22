import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { Techno } from '../../../models/techno.ts';


@customElement('techno-card-info')
export class CardInfo extends LitElement {

  @property({ type: Object }) techno: Techno;

  static styles = css`
    :host {
      display: block;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      background-color: white;
      transition: box-shadow 0.3s ease;
    }

    :host(:hover) {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .card-content {
      display: flex;
      flex-direction: column;
    }

    .card-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      object-fit: cover;
    }

    .card-text {
      margin-top: 12px;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: bold;
      color: #3B82F6; /* Primary color */
    }

    .card-description {
      font-size: 1rem;
      color: #6B7280; /* Text color */
    }

    .card-button {
      margin-top: 12px;
      align-self: flex-start;
      font-size: 0.875rem;
      font-weight: 500;
      color: #3B82F6;
      text-decoration: underline;
      cursor: pointer;
    }

    .card-button:hover {
      color: #1E40AF;
    }
  `;

  render() {
    return html`
      <div class="card-content">
        <img class="card-image" .src="${this.techno.image}" alt="Image de la technologie" />

        <div class="card-text">
          <h3 class="card-title">${this.techno.title}</h3>
          <p class="card-description">${this.techno.shortDescription}</p>
        </div>

        <a class="card-button" href="#${this.techno.link}">Voir plus</a>
      </div>
    `;
  }
}
