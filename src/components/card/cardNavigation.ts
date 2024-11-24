import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import type { CardNavigationInfos } from '../../models/card';
import { style } from '../../styles/card/navigation';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

@customElement('app-card-navigation')
export class CardNavigation extends LitElement {
  // Define the props for the component, expecting an object of type CardNavigationInfos
  @property({ type: Object }) cardNavigationInfos!: CardNavigationInfos;

  // Reactive reference to track if the card is hovered
  private isHovered = false;

  // Function to handle mouse enter event, sets isHovered to true
  private handleMouseEnter() {
    this.isHovered = true;
  }

  // Function to handle mouse leave event, sets isHovered to false
  private handleMouseLeave() {
    this.isHovered = false;
  }

  // Function to handle click event, navigates to the path specified in cardNavigationInfos
  private handleClick() {
    window.location.href = this.cardNavigationInfos.path;
  }

  static styles = style;

  render() {
    return html`
      <div
        class="card-navigation"
        @mouseenter="${this.handleMouseEnter}"
        @mouseleave="${this.handleMouseLeave}"
        @click="${this.handleClick}"
      >
        <!-- Display the icon if the card is not hovered -->
        ${!this.isHovered
          ? html`<sl-icon
              name="${this.cardNavigationInfos.iconUrl}"
              class="text-3xl animate__animated animate__fadeInDown animate__faster"
            ></sl-icon>`
          : ''}
        <!-- Display the title if the card is not hovered -->
        ${!this.isHovered
          ? html`<h3
              class="font-bold text-lg animate__animated animate__fadeInDown animate__faster"
            >
              ${this.cardNavigationInfos.title}
            </h3>`
          : ''}
        <!-- Display the description if the card is hovered -->
        ${this.isHovered
          ? html`<p
              class="text-center text-sm animate__animated animate__fadeInUp animate__faster"
            >
              ${this.cardNavigationInfos.description}
            </p>`
          : ''}
      </div>
    `;
  }
}