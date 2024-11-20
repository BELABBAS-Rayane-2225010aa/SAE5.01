import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';

@customElement('blur-background')
export class BlurBackground extends LitElement {
  @property({ type: String }) title = '';

  static styles = css`
    .blur-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `;

  render() {
    return html`
      <div class="blur-sm">
        <default-background ?is-hide-title=${true}></default-background>
      </div>
      <div class="blur-bg bg-white dark:bg-black p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-6 text-center">${this.title}</h2>
        <slot></slot>
      </div>
    `;
  }
}