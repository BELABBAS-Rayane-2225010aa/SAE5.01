import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { style } from '../../../styles/technologie/cardTechno';

import { Techno } from '../../../models/techno';


@customElement('app-techno-card')
export class CardTechno extends LitElement {

  @property({ type: Object }) technoCard: Techno = {
    title: '',
    icon: '',
    image: '',
    shortDescription: '',
    functioningImage: '',
    installImage: '',
    functioningDescription: '',
    installDescription: '',
    link: '',};

  static styles = [
    style
  ];

  render() {
    return html`
      <div class="cardTechno">
        <div>
          <!-- Image -->
          <img
            class="cardImageTechno"
            src="${this.technoCard.image || ''}"
            alt="${this.technoCard.title || 'Techno image'}"
          />

          <!-- Texte -->
          <div class="cardTextTechno">
            <h3 class="text-xl font-bold text-primary-500">
              ${this.technoCard.title}
            </h3>
            <p>${this.technoCard.shortDescription}</p>
          </div>
        </div>

        <!-- Bouton -->
        <a
          class="cardButtonTechno"
          href="#${this.technoCard.link}"
        >
          Voir plus
        </a>
      </div>
    `;
  }
}