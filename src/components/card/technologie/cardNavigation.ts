import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Techno } from '../../../models/techno';

// Define a new custom element with the name 'app-techno-navigation'
@customElement('app-techno-navigation')
export class CardNavigation extends LitElement {
  // Define the styles for this component
  static styles = css`
    .navigation {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: row;
      box-shadow: 0px 0px 15px -7px #000000;
      border-radius: 50px;
      padding: 10px 20px;
      gap: 10px;
    }

    .navigation li {
      padding: 5px;
      transition: 0.3s ease-in-out;
      border-radius: 25px;
      box-shadow: 0px 0px 15px -7px #000000;
    }

    .is-selected {
      background-color: var(--primary-color, #3498db);
    }

    .not-selected {
      background-color: transparent;
    }
  `;

  // Define a property 'technoCard' of type Techno array with default empty array
  @property({ type: Array }) technoCard: Techno[] = [];
  // Define a state variable 'hash' to store the current hash value
  @state() hash: string = '';

  // Lifecycle method called when the component is added to the DOM
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this.updateHash.bind(this));
    this.updateHash();
  }

  // Lifecycle method called when the component is removed from the DOM
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('hashchange', this.updateHash.bind(this));
  }

  // Method to update the hash value
  updateHash() {
    this.hash = window.location.hash || '#';
  }

  // Render method to describe the component's template
  render() {
    return html`
      <ul class="navigation">
        ${this.technoCard.map(
          (technoInfo) => html`
            <li
              class=${this.hash === `#${technoInfo.link}` ? 'is-selected' : 'not-selected'}
            >
              <u-tooltip .text=${technoInfo.title}>
                <u-button
                  href="#${technoInfo.link}"
                  variant="link"
                  icon=${technoInfo.icon}
                  color="white"
                ></u-button>
              </u-tooltip>
            </li>
          `
        )}
      </ul>
    `;
  }
}