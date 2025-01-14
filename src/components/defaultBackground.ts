import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { style } from '../styles/defaultBackground';
import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('app-default-background')
export class DefaultBackground extends LitElement {
  // Define a property to conditionally hide the title
  @property({ type: Boolean }) isHideTitle: boolean = false;

  // Apply the imported styles to this component
  static styles = style;

  // Render method to describe the component's template
  render() {
    return html`
      <!-- Main background container -->
      <div class="background">
        <!-- Conditionally render the title based on the isHideTitle prop -->
        ${!this.isHideTitle ? html`
          <h1 class="text-white text-4xl font-bold text-center">
            Bienvenue dans le <br />
            magasin connecté 4.0
          </h1>
        ` : ''}
      </div>
    `;
  }
}