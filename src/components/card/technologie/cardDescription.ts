import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { style } from '../../../styles/technologie/cardDescription';
import '../cardPresentation';

import { Techno } from '../../../models/techno';

@customElement('app-techno-description')
export class CardDescription extends LitElement {
    @property({ type: Object }) technoCard: Techno = {
        title: '',
        icon: '',
        image: '',
        shortDescription: '',
        functioningImage: '',
        installImage: '',
        functioningDescription: '',
        installDescription: '',
        link: '',};

    static styles = [
        style
        ];

  render() {
    return html`
      <div class="description__container" id="${this.technoCard.link}">
        <!-- Page Header -->
        <page-header
          .title="${this.technoCard.title}"
          .image="${this.technoCard.image ?? ''}"
          .imageAlt="${this.technoCard.title}"
          is-small
        ></page-header>

        <!-- Short Description -->
        <p>${this.technoCard.shortDescription}</p>

        <!-- Functioning Card -->
        <app-card-presentation
          .cardInfos="${{
            title: 'Le fonctionnement',
            description: this.technoCard.functioningDescription,
            publicImage: this.technoCard.functioningImage,
          }}"
        ></app-card-presentation>

        <!-- Installation Card -->
        <app-card-presentation
          .cardInfos="${{
            title: 'Installation',
            description: this.technoCard.installDescription,
            publicImage: this.technoCard.installImage,
            isReversed: true,
          }}"
        ></app-card-presentation>
      </div>
    `;
  }
}
