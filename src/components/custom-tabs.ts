import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('custom-tabs')
export class CustomTabs extends LitElement {
  @property({ type: Array }) items: { label: string }[] = [];
  @property({ type: String }) selectedTab: string = '';

  static styles = css`
    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .tab {
      padding: 10px 20px;
      cursor: pointer;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #f9f9f9;
    }
    .tab.selected {
      background-color: #e9e9e9;
      font-weight: bold;
    }
  `;

  render() {
    return html`
      <div class="tabs">
        ${this.items.map(item => html`
          <div
            class="tab ${this.selectedTab === item.label ? 'selected' : ''}"
            @click=${() => this.selectTab(item.label)}
          >
            ${item.label}
          </div>
        `)}
      </div>
      <div class="content">
        <slot></slot>
      </div>
    `;
  }

  selectTab(label: string) {
    this.selectedTab = label;
    this.dispatchEvent(new CustomEvent('tab-selected', { detail: { label } }));
  }
}