import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { style } from '../../styles/admin/popUpEvent';

@customElement('admin-popup-event-suppression')
export class AdminPopUpEventSuppression extends LitElement {
  static styles = style;

  render() {
    return html`
      <div class="popup">
        <div class="popup-content">
          <p class="popupTitle">Confirmer la suppression</p>
          <p>Êtes-vous sûr de vouloir supprimer cet événement ?</p>
          <button @click=${() => this.dispatchEvent(new CustomEvent('confirm'))} class="submitBtn">Oui</button>
          <button @click=${() => this.dispatchEvent(new CustomEvent('cancel'))} class="submitBtn">Non</button>
        </div>
      </div>
    `;
  }
}