import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { style } from '../../styles/admin/popUpEvent';

// Define a new custom element with the name 'admin-popup-event-suppression'
@customElement('admin-popup-event-suppression')
export class AdminPopUpEventSuppression extends LitElement {
  // Apply the imported styles to this component
  static styles = style;

  // Render method to describe the component's template
  render() {
    return html`
      <div class="popup">
        <div class="popup-content">
          <!-- Title of the popup -->
          <p class="popupTitle">Confirmer la suppression</p>
          <!-- Confirmation message -->
          <p>Êtes-vous sûr de vouloir supprimer cet événement ?</p>
          <!-- Button to confirm the deletion, triggers the 'confirm' event -->
          <button @click=${() => this.dispatchEvent(new CustomEvent('confirm'))} class="submitBtn">Oui</button>
          <!-- Button to cancel the deletion, triggers the 'cancel' event -->
          <button @click=${() => this.dispatchEvent(new CustomEvent('cancel'))} class="submitBtn">Non</button>
        </div>
      </div>
    `;
  }
}