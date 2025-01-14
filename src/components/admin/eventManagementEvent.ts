// Importation des modules et décorateurs nécessaires depuis 'lit' et 'lit/decorators.js'
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// Importation du modèle EventPage
import { EventPage } from '../../models/event';
// Importation des styles pour ce composant
import { style } from '../../styles/admin/eventManagementEvent';

// Définition d'un nouvel élément personnalisé avec le nom 'admin-event-management-event'
@customElement('admin-event-management-event')
export class AdminEventManagementEvent extends LitElement {
  // Définition d'une propriété 'event' de type EventPage avec des valeurs par défaut
  @property({ type: Object }) event: EventPage = {
    id: 0,
    title: '',
    description: '',
    images: '',
    links: '',
    date: '',
    time: '',
    location: '',
  };

  // Application des styles importés à ce composant
  static styles = style;

  // Définition de la méthode render pour décrire le template du composant
  render() {
    return html`
      <!-- Affichage du titre de l'événement -->
      <td class="title">${this.event.title}</td>
      <!-- Affichage de la date de l'événement -->
      <td>${this.event.date}</td>
      <!-- Affichage du lieu de l'événement -->
      <td>${this.event.location}</td>
      <td>
        <div>
          <!-- Bouton pour modifier l'événement, déclenche l'événement 'showPopUpEvent' avec les détails de l'événement -->
          <button @click=${() => this.dispatchEvent(new CustomEvent('showPopUpEvent', { detail: this.event }))}>
            Modifier
          </button>
          <!-- Bouton pour supprimer l'événement, déclenche l'événement 'showPopUpEventSuppression' avec les détails de l'événement -->
          <button @click=${() => this.dispatchEvent(new CustomEvent('showPopUpEventSuppression', { detail: this.event }))}>
            Supprimer
          </button>
        </div>
      </td>
    `;
  }
}