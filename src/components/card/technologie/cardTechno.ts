import { html, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { style } from '../../../styles/technologie/cardTechno';
import { Techno } from '../../../models/techno';

// Define a new custom element with the name 'app-techno-card'
@customElement('app-techno-card')
export class CardTechno extends LitElement {
  // Define a property 'technoCard' of type Techno with default values
  @property({ type: Object }) technoCard: Techno = {
    title: '',
    icon: '',
    image: '',
    shortDescription: '',
    functioningImage: '',
    installImage: '',
    functioningDescription: '',
    installDescription: '',
    link: '',
  };

  // Apply the imported styles to this component
  static styles = [style];

  // Render method to describe the component's template
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

          <!-- Text -->
          <div class="cardTextTechno">
            <h3 class="text-xl font-bold text-primary-500">
              ${this.technoCard.title}
            </h3>
            <p>${this.technoCard.shortDescription}</p>
          </div>
        </div>

        <!-- Button -->
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