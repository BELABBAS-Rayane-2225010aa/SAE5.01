import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';

@customElement('blur-background')
export class BlurBackground extends LitElement {
  // Define a property 'title' of type String
  @property({ type: String }) title = '';

  // Define the styles for this component
  static styles = css`
    .blur-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `;

  // Render method to describe the component's template
  render() {
    return html`
      <div class="blur-sm">
        <!-- Default background component with hidden title -->
        <default-background ?is-hide-title=${true}></default-background>
      </div>
      <div class="blur-bg bg-white dark:bg-black p-8 rounded-lg shadow-lg max-w-md w-full">
        <!-- Title of the blur background component -->
        <h2 class="text-2xl font-bold mb-6 text-center">${this.title}</h2>
        <!-- Slot for additional content -->
        <slot></slot>
      </div>
    `;
  }
}