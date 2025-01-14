import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { style } from '../styles/scrollButton';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@customElement('app-scroll-button')
export class ScrollButton extends LitElement {
  // Define a property to specify the hash of the element to scroll to
  @property({ type: String }) hash: string = '';

  // Apply the imported styles to this component
  static styles = style;

  // Method to scroll to the element with the specified hash
  private scrollToHash() {
    const element = this.shadowRoot?.getElementById(this.hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Render method to describe the component's template
  render() {
    return html`
      <!-- Container for the scroll button -->
      <div class="scroll-button">
        <!-- Button that scrolls to the element with the specified hash -->
        <sl-button
          class="animate-bounce hover:animate-none rounded-full"
          @click="${this.scrollToHash}"
          size="large"
          variant="primary"
          circle
        >
          <!-- Icon for the scroll button -->
          <sl-icon name="arrow-down" label="Scroll"></sl-icon>
        </sl-button>
      </div>
    `;
  }
}