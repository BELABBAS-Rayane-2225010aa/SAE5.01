import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EventPage } from '../../models/event';
import { useToast } from '../../composables/useToast';

import { style } from '../../styles/admin/eventManagement'

@customElement('admin-event-management')
export class EventManagement extends LitElement {
  @property({ type: Array }) events: EventPage[] = [];
  @state() showPopup: boolean = false;
  @state() showConfirmationPopup: boolean = false;
  @state() isUpdateAction: boolean = false;
  @state() selectedEvent: EventPage | null = null;

  static styles = style;

  async addEvent(eventData: CustomEvent) {
    try {
      const { EventPost } = await import("../../server/api/event/event.post");
      const response = new EventPost();
      const postResult = await response.post(eventData.detail) as EventPage;
      this.dispatchEvent(new CustomEvent('updateEventList'));
      this.showPopup = false;
      if (postResult && typeof postResult === 'object' && 'id' in postResult) {
        useToast.add({ title: 'Succès', description: 'L\'événement a bien été ajouté', color: 'green' });
      } else {
        useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de l\'ajout de l\'événement', color: 'red' });
      }
    } catch (error) {
      console.error(error);
      useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de l\'ajout de l\'événement', color: 'red' });
    }
  }

  async updateEvent(updatedEvent: EventPage) {
    try {
      const { EventUpdate } = await import("../../server/api/event/event.update");
      const response = new EventUpdate();
      const updateResult = await response.post(updatedEvent);
      this.dispatchEvent(new CustomEvent('updateEventList'));
      this.showPopup = false;
      if (updateResult && typeof updateResult === 'object' && 'id' in updateResult) {
        useToast.add({ title: 'Succès', description: 'L\'événement a bien été modifié', color: 'green' });
      } else {
        useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de la modification de l\'événement', color: 'red' });
      }
    } catch (error) {
      console.error(error);
      useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de la modification de l\'événement', color: 'red' });
    }
  }

  async deleteEvent() {
    if (!this.selectedEvent) return;

    try {
      const { EventDelete } = await import("../../server/api/event/event.delete");
      const response = new EventDelete();
      const deleteResult = await response.delete(this.selectedEvent.id);
      this.dispatchEvent(new CustomEvent('updateEventList'));
      this.showConfirmationPopup = false;
      if (deleteResult && typeof deleteResult === 'object' && 'id' in deleteResult) {
        useToast.add({ title: 'Succès', description: 'L\'événement a bien été supprimé', color: 'green' });
      } else {
        useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de l\'événement', color: 'red' });
      }
    } catch (error) {
      console.error(error);
      useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de l\'événement', color: 'red' });
    }
  }

  handleShowUpdatePopup(event: EventPage) {
    this.selectedEvent = event;
    this.isUpdateAction = true;
    this.showPopup = true;
  }

  handleShowConfirmationPopup(event: EventPage) {
    this.selectedEvent = event;
    this.showConfirmationPopup = true;
  }

  handleShowAddPopup() {
    this.selectedEvent = null;
    this.isUpdateAction = false;
    this.showPopup = true;
  }

  render() {
    return html`
      <div>
        <!-- Button to create an Event -->
        <button @click=${this.handleShowAddPopup}>Créer un événement</button>

        <!-- Popup to add or update an Event -->
        ${this.showPopup ? html`
          <admin-popup-event
            .event=${this.selectedEvent || {} as EventPage}
            @submit=${this.isUpdateAction ? this.updateEvent : this.addEvent}
            @close=${() => this.showPopup = false}
          ></admin-popup-event>
        ` : ''}

        <!-- Popup to confirm the deletion of an Event -->
        ${this.showConfirmationPopup ? html`
          <admin-popup-event-suppression
            @confirm=${this.deleteEvent}
            @cancel=${() => this.showConfirmationPopup = false}
          ></admin-popup-event-suppression>
        ` : ''}

        <!-- Table to display the list of Events -->
        <div class="tab-container">
          <table class="event-table">
            <thead>
              <tr>
                <th class="title-column">Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${this.events.map(event => html`
                <tr>
                  <td>${event.title}</td>
                  <td>${event.date}</td>
                  <td>${event.location}</td>
                  <td>
                    <button @click=${() => this.handleShowUpdatePopup(event)}>Modifier</button>
                    <button @click=${() => this.handleShowConfirmationPopup(event)}>Supprimer</button>
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}