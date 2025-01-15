import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { style } from '../styles/globalWrapper';
import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('app-global-wrapper')
export class GlobalWrapper extends LitElement {
  // Define a property to conditionally enable fullscreen mode
  @property({ type: Boolean }) withFullscreen: boolean = false;

  // Apply the imported styles to this component
  static styles = style;

  // Render method to describe the component's template
  render() {
    return html`
      <div class="global-wrapper ${this.withFullscreen ? 'fullscreen' : ''}">
        <slot></slot>
      </div>
    `;
  }
}