import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EventPage } from '../../models/event';
import { style } from '../../styles/admin/popUpEvent';

// Define a new custom element with the name 'admin-popup-event'
@customElement('admin-popup-event')
export class AdminPopUpEvent extends LitElement {
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

  // Define state variables for form data and managing image/link edits
  @state() formData: EventPage = { ...this.event };
  @state() imageUrl: string = '';
  @state() link: string = '';
  @state() editImageIndex: number | null = null;
  @state() editLinkIndex: number | null = null;

  // Apply the imported styles to this component
  static styles = style;

  // Update formData when the event property changes
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('event')) {
      this.formData = { ...this.event };
    }
  }

  // Method to add an image
  addImage() {
    if (this.imageUrl) {
      if (this.editImageIndex !== null) {
        this.formData.images = this.imageUrl;
        this.editImageIndex = null;
      } else {
        this.formData.images = this.imageUrl;
      }
      this.imageUrl = '';
    }
  }

  // Method to edit an existing image
  editImage() {
    this.imageUrl = this.formData.images;
  }

  // Method to delete an image
  deleteImage() {
    this.formData.images = '';
  }

  // Method to add a link
  addLink() {
    if (this.link) {
      if (this.editLinkIndex !== null) {
        this.formData.links = this.link;
        this.editLinkIndex = null;
      } else {
        this.formData.links = this.link;
      }
      this.link = '';
    }
  }

  // Method to edit an existing link
  editLink() {
    this.link = this.formData.links;
  }

  // Method to delete a link
  deleteLink() {
    this.formData.links = '';
  }

  // Method to handle form submission
  handleSubmit() {
    this.dispatchEvent(new CustomEvent('submit', { detail: this.formData }));
  }

  // Render method to describe the component's template
  render() {
    return html`
      <div class="popup">
        <div class="popup-content">
          <p class="popupTitle">${this.event.id ? 'Modifier l\'événement' : 'Créer un événement'}</p>

          <form @submit=${(e: Event) => { e.preventDefault(); this.handleSubmit(); }}>
            <div class="form-group">
              <label for="title">Titre : </label>
              <input type="text" id="title" .value=${this.formData.title || ''} @input=${(e: Event) => this.formData.title = (e.target as HTMLInputElement).value} required />
            </div>

            <div class="form-group">
              <label for="description">Description : </label>
              <textarea id="description" .value=${this.formData.description || ''} @input=${(e: Event) => this.formData.description = (e.target as HTMLTextAreaElement).value} required></textarea>
            </div>

            <div class="form-group">
              <label for="date">Date : </label>
              <input type="date" id="date" .value=${this.formData.date || ''} @input=${(e: Event) => this.formData.date = (e.target as HTMLInputElement).value} required />
            </div>

            <div class="form-group">
              <label for="location">Lieu : </label>
              <input type="text" id="location" .value=${this.formData.location || ''} @input=${(e: Event) => this.formData.location = (e.target as HTMLInputElement).value} required />
            </div>

            <div class="form-group">
              <label for="imageUrl">Ajouter ou modifier une image (URL) : </label>
              <div class="input-button-group">
                <input type="text" id="imageUrl" .value=${this.imageUrl || ''} @input=${(e: Event) => this.imageUrl = (e.target as HTMLInputElement).value} />
                <button type="button" @click=${this.addImage}>${this.editImageIndex !== null ? 'Modifier' : 'Ajouter'} l'image</button>
              </div>
            </div>
            <div class="form-group">
              <h3>Images ajoutées : </h3>
              <table class="added-items-table">
                <tbody>
                    <tr>
                      <td class="link-cell">
                        <a href=${this.event.images} target="_blank">${this.event.images}</a>
                      </td>
                      <td class="button-cell">
                        <button type="button" @click=${() => this.editImage()}>Modifier</button>
                        <button type="button" @click=${() => this.deleteImage()}>Supprimer</button>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>

            <div class="form-group">
              <label for="link">Ajouter ou modifier un lien (URL) : </label>
              <div class="input-button-group">
                <input type="text" id="link" .value=${this.link || ''} @input=${(e: Event) => this.link = (e.target as HTMLInputElement).value} />
                <button type="button" @click=${this.addLink}>${this.editLinkIndex !== null ? 'Modifier' : 'Ajouter'} le lien</button>
              </div>
            </div>
            <div class="form-group">
              <h3>Liens ajoutés : </h3>
              <table class="added-items-table">
                <tbody>
                    <tr>
                      <td class="link-cell">
                        <p>${this.event.links}</p>
                      </td>
                      <td class="button-cell">
                        <button type="button" @click=${() => this.editLink()}>Modifier</button>
                        <button type="button" @click=${() => this.deleteLink()}>Supprimer</button>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>

            <div class="form-group">
              <button type="submit" class="submitBtn">Soumettre</button>
              <button type="button" @click=${() => this.dispatchEvent(new CustomEvent('close'))} class="submitBtn">Retour</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}