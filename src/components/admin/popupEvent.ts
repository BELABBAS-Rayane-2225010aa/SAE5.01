import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EventPage } from '../../models/event';

import { style } from '../../styles/admin/popUpEvent';

@customElement('admin-popup-event')
export class AdminPopUpEvent extends LitElement {
  @property({ type: Object }) event: EventPage = {
    id: 0,
    title: '',
    description: '',
    images: [],
    links: [],
    date: '',
    time: '',
    location: '',
  };

  @state() formData: EventPage = { ...this.event };
  @state() imageUrl: string = '';
  @state() link: string = '';
  @state() editImageIndex: number | null = null;
  @state() editLinkIndex: number | null = null;

  static styles = style;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('event')) {
      this.formData = { ...this.event };
      if (!Array.isArray(this.formData.images)) {
        this.formData.images = [];
      }
      if (!Array.isArray(this.formData.links)) {
        this.formData.links = [];
      }
    }
  }

  addImage() {
    if (this.imageUrl) {
      if (this.editImageIndex !== null) {
        this.formData.images[this.editImageIndex] = this.imageUrl;
        this.editImageIndex = null;
      } else {
        this.formData.images.push(this.imageUrl);
      }
      this.imageUrl = '';
    }
  }

  editImage(index: number) {
    this.imageUrl = this.formData.images[index];
    this.editImageIndex = index;
  }

  deleteImage(index: number) {
    this.formData.images.splice(index, 1);
  }

  addLink() {
    if (this.link) {
      if (this.editLinkIndex !== null) {
        this.formData.links[this.editLinkIndex] = this.link;
        this.editLinkIndex = null;
      } else {
        this.formData.links.push(this.link);
      }
      this.link = '';
    }
  }

  editLink(index: number) {
    this.link = this.formData.links[index];
    this.editLinkIndex = index;
  }

  deleteLink(index: number) {
    this.formData.links.splice(index, 1);
  }

  handleSubmit() {
    this.dispatchEvent(new CustomEvent('submit', { detail: this.formData }));
  }

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
                  ${this.formData.images.map((image, index) => html`
                    <tr>
                      <td class="link-cell">
                        <a href=${image} target="_blank">${image}</a>
                      </td>
                      <td class="button-cell">
                        <button type="button" @click=${() => this.editImage(index)}>Modifier</button>
                        <button type="button" @click=${() => this.deleteImage(index)}>Supprimer</button>
                      </td>
                    </tr>
                  `)}
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
                  ${this.formData.links.map((link, index) => html`
                    <tr>
                      <td class="link-cell">
                        <p>${link}</p>
                      </td>
                      <td class="button-cell">
                        <button type="button" @click=${() => this.editLink(index)}>Modifier</button>
                        <button type="button" @click=${() => this.deleteLink(index)}>Supprimer</button>
                      </td>
                    </tr>
                  `)}
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