import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EventPage } from '../../models/event';
import { style } from '../../styles/admin/eventManagementEvent';

// Define a new custom element with the name 'admin-event-management-event'
@customElement('admin-event-management-event')
export class AdminEventManagementEvent extends LitElement {
  // Define a property 'event' of type EventPage with default values
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

  // Apply the imported styles to this component
  static styles = style;

  // Define the render method to describe the component's template
  render() {
    return html`
      <!-- Display the event title -->
      <td class="title">${this.event.title}</td>
      <!-- Display the event date -->
      <td>${this.event.date}</td>
      <!-- Display the event location -->
      <td>${this.event.location}</td>
      <td>
        <div>
          <!-- Button to edit the event, triggers the 'showPopUpEvent' event with the event details -->
          <button @click=${() => this.dispatchEvent(new CustomEvent('showPopUpEvent', { detail: this.event }))}>
            Edit
          </button>
        </div>
      </td>
    `;
  }
}