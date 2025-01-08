import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-visualisation')
export class SolarPanelVisualisation extends LitElement {
  static styles = css`
    .chart {
      padding: 24px;
    }
    .mt-5 {}
      margin-top: 1.25rem;
    }
  `;

  render() {
    return html`
      <!-- Energie produite -->
      <app-global-wrapper>
        <div class="overview">
          <solar-panel-overview></solar-panel-overview>
        </div>
      </app-global-wrapper>

      <!-- Bénéfices environmentaux -->
      <div class="greenwashing-wrapper">
        <app-green-washing></app-green-washing>
      </div>

      <!-- production de l'énergie -->
      <app-global-wrapper>
        <div class="chart mt-5">
          <solar-panel-energychart></solar-panel-energychart>
        </div>
      </app-global-wrapper>
    `;
  }
}