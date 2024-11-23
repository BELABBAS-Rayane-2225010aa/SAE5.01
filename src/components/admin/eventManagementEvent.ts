import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EventPage } from '../../models/event';

import { style } from '../../styles/admin/eventManagementEvent';

@customElement('admin-event-management-event')
export class AdminEventManagementEvent extends LitElement {
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

  static styles = style;

  render() {
    return html`
      <td class="title">${this.event.title}</td>
      <td>${this.event.date}</td>
      <td>${this.event.location}</td>
      <td>
        <div>
          <button @click=${() => this.dispatchEvent(new CustomEvent('showPopUpEvent', { detail: this.event }))}>
            Modifier
          </button>
          <button @click=${() => this.dispatchEvent(new CustomEvent('showPopUpEventSuppression', { detail: this.event }))}>
            Supprimer
          </button>
        </div>
      </td>
    `;
  }
}