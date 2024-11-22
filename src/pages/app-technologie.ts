import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Techno } from '../models/techno';
import { definePageMeta } from "../meta";

// page available without authentication
definePageMeta({
  auth: false,
});

@customElement('app-technologie')
export class AppTechnologie extends LitElement {
  @state() techno: Techno[] = [];
  @state() isLoading = true;

  static styles = css`
    @import url("~/assets/css/technologiesPage.css");
  `;

  render() {
    return html`
      <app-global-wrapper class="techno-wrapper">
        <main-title text="Nos technologies"></main-title>

        <div class="content-techno">
          ${this.techno.map(techno => html`
            <app-technologies-card-info .technoInfos=${techno}></app-technologies-card-info>
          `)}
        </div>

        <div class="content-description">
          ${this.techno.map(techno => html`
            <app-technologies-description .technoInfo=${techno}></app-technologies-description>
          `)}
        </div>

        <app-technologies-navigation .technoInfos=${this.techno}></app-technologies-navigation>
      </app-global-wrapper>
    `;
  }
}
