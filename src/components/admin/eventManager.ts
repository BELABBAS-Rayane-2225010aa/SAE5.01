import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EventPage } from '../../models/event';
import { useToast } from '../../composables/useToast';
import { style } from '../../styles/admin/eventManagement';

// Define a new custom element with the name 'admin-event-management'
@customElement('admin-event-management')
export class EventManagement extends LitElement {
  // Define a property 'events' of type EventPage array with default empty array
  @property({ type: Array }) events: EventPage[] = [];
  // Define state variables for managing popup visibility and selected event
  @state() showPopup: boolean = false;
  @state() showConfirmationPopup: boolean = false;
  @state() isUpdateAction: boolean = false;
  @state() selectedEvent: EventPage | null = null;
  @state() searchQuery: string = '';
  @state() visibleEventsCount: number = 10;

  // Apply the imported styles to this component
  static styles = style;

  // Method to add a new event
  async addEvent(eventData: CustomEvent) {
    try {
      // Send a POST request to add the event
      const response = await fetch('https://api-magasinconnecte.alwaysdata.net/src/endpoint/events/post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData.detail),
      });
      if (response.ok) {
        // If the request is successful, update the event list and show a success toast
        await response.json();
        this.dispatchEvent(new CustomEvent('updateEventList'));
        this.showPopup = false;
        useToast.add({ title: 'Succès', description: 'L\'événement a bien été ajouté', color: 'green' });
      } else {
        // If the request fails, show an error toast
        useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de l\'ajout de l\'événement', color: 'red' });
      }
    } catch (error) {
      // If there is an error, log it and show an error toast
      console.error(error);
      useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de l\'ajout de l\'événement', color: 'red' });
    }
  }

  // Method to update an existing event
  async updateEvent(updatedEvent: CustomEvent) {
    try {
      // Send a PUT request to update the event
      const response = await fetch('https://api-magasinconnecte.alwaysdata.net/src/endpoint/events/put.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent.detail),
      });
      if (response.ok) {
        // If the request is successful, update the event list and show a success toast
        await response.json();
        this.dispatchEvent(new CustomEvent('updateEventList'));
        this.showPopup = false;
        useToast.add({ title: 'Succès', description: 'L\'événement a bien été modifié', color: 'green' });
      } else {
        // If the request fails, show an error toast
        useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de la modification de l\'événement', color: 'red' });
      }
    } catch (error) {
      // If there is an error, log it and show an error toast
      console.error(error);
      useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de la modification de l\'événement', color: 'red' });
    }
  }

  // Method to delete an event
  async deleteEvent() {
    if (!this.selectedEvent) return;

    try {
      // Send a DELETE request to delete the event
      const response = await fetch(`https://api-magasinconnecte.alwaysdata.net/src/endpoint/events/delete.php?id=${this.selectedEvent.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // If the request is successful, update the event list and show a success toast
        await response.json();
        this.dispatchEvent(new CustomEvent('updateEventList'));
        this.showConfirmationPopup = false;
        useToast.add({ title: 'Succès', description: 'L\'événement a bien été supprimé', color: 'green' });
      } else {
        // If the request fails, show an error toast
        useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de l\'événement', color: 'red' });
      }
    } catch (error) {
      // If there is an error, log it and show an error toast
      console.error(error);
      useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de la suppression de l\'événement', color: 'red' });
    }
  }

  // Method to show the update popup
  handleShowUpdatePopup(event: EventPage) {
    this.selectedEvent = event;
    this.isUpdateAction = true;
    this.showPopup = true;
  }

  // Method to show the confirmation popup
  handleShowConfirmationPopup(event: EventPage) {
    this.selectedEvent = event;
    this.showConfirmationPopup = true;
  }

  // Method to show the add popup
  handleShowAddPopup() {
    this.selectedEvent = null;
    this.isUpdateAction = false;
    this.showPopup = true;
  }

  handleSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
  }

  showMoreEvents() {
    this.visibleEventsCount += 10;
  }

  // Render method to describe the component's template
  render() {
    const filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(this.searchQuery) ||
      event.description.toLowerCase().includes(this.searchQuery)
    );

    return html`
      <div>
        <!-- Button to create an Event -->
        <button @click=${this.handleShowAddPopup}>Créer un événement</button>

        <!-- Search bar -->
        <input type="text" placeholder="Rechercher un événement" @input=${this.handleSearch} />

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
              ${filteredEvents.slice(0, this.visibleEventsCount).map(event => html`
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
          ${this.visibleEventsCount < filteredEvents.length ? html`
            <div class="show-more-container">
              <button @click=${this.showMoreEvents}>Afficher plus</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}