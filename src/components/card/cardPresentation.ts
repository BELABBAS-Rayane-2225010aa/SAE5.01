import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { Infos } from '@/models/infos';

import { style } from '../../styles/card/presentation';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';


@customElement('app-card-presentation')
export class CardPresentation extends LitElement {

  // Define a property to conditionally hide the title
  @property({ attribute: false }) cardInfos: Infos = { title: '', description: '' };

  static styles = style;

  render() {
    return html`
      <div class="card">
        <!-- Display the image if isReversed is false and publicImage is provided -->
        ${!this.cardInfos.isReversed && this.cardInfos.publicImage ? html`
          <img
            class="card-image"
            src="${this.cardInfos.publicImage}"
            alt="${this.cardInfos.title}"
          />
        ` : ''}

        <!-- Display the card description, adjust the class based on whether an image is provided -->
        <div class="${this.cardInfos.publicImage ? 'card-description' : 'card-description-fullwidth'}">
          <h2>${this.cardInfos.title}</h2>
          ${this.cardInfos.subTitle ? html`<h3>${this.cardInfos.subTitle}</h3>` : ''}
          <p>${this.cardInfos.description}</p>
        </div>

        <!-- Display the image if isReversed is true and publicImage is provided -->
        ${this.cardInfos.isReversed && this.cardInfos.publicImage ? html`
          <img
            class="card-image"
            src="${this.cardInfos.publicImage}"
            alt="${this.cardInfos.title}"
          />
        ` : ''}
      </div>
    `;
  }
}