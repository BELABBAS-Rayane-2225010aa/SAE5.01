import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('custom-tabs')
export class CustomTabs extends LitElement {
  // Define a property 'items' of type array with default empty array
  @property({ type: Array }) items: { label: string }[] = [];
  // Define a property 'selectedTab' of type string with default empty string
  @property({ type: String }) selectedTab: string = '';

  // Define the styles for this component
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

  // Render method to describe the component's template
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

  // Method to select a tab and dispatch a custom event
  selectTab(label: string) {
    this.selectedTab = label;
    this.dispatchEvent(new CustomEvent('tab-selected', { detail: { label } }));
  }
}