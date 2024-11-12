import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import { style } from '../styles/globalWrapper';

import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('app-global-wrapper')
export class GlobalWrapper extends LitElement {

  // Define a property to conditionally hide the title
  @property({ type: Boolean }) withFullscreen: boolean = false;

  static styles = style;

  render() {
    return html`
      <div
        class="global-wrapper ${this.withFullscreen ? 'fullscreen' : ''}"
      >
        <slot></slot>
      </div>
    `;
  }
}