import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { style } from '../styles/scrollButton';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js'; // Assurez-vous d'importer le composant d'icône

@customElement('app-scroll-button')
export class ScrollButton extends LitElement {

  // Define a property to conditionally hide the title
  @property({ type: String }) hash: string = '';

  static styles = style;

  private scrollToHash() {
    const element = this.shadowRoot?.getElementById(this.hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    return html`
      <!-- Container for the scroll button -->
      <div class="scroll-button">
        <!-- Button that scrolls to the element with the specified hash -->
        <sl-button
          class="animate-bounce hover:animate-none rounded-full"
          @click="${this.scrollToHash}"
          size="medium"
        >
          <sl-icon name="arrow-down"></sl-icon> <!-- Utilisez une icône disponible -->
        </sl-button>
      </div>
    `;
  }
}