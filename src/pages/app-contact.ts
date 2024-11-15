import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styles } from '../styles/shared-styles';
import { z } from 'zod';

const IDENTITIES = ["student", "teacher", "company", "other"] as const;

const IDENTITIES_SELECT = [
  { label: "Étudiant", value: IDENTITIES[0] },
  { label: "Enseignant", value: IDENTITIES[1] },
  { label: "Entreprise", value: IDENTITIES[2] },
  { label: "Autre", value: IDENTITIES[3] },
];

const schema = z.object({
  identity: z.enum(IDENTITIES),
  subject: z.string().min(1, "Requis"),
  message: z.string().min(1, "Requis"),
});

type Schema = z.output<typeof schema>;

@customElement('app-contact')
class ContactForm extends LitElement {
  @state() state: Schema = {
    identity: "student",
    subject: "",
    message: "",
  };

  @state() items: { label: string }[] = [];

  static styles = styles;

  connectedCallback() {
    super.connectedCallback();
    this.fetchShops();
  }

  async fetchShops() {
    try {
      const response = await fetch("../server/api/shop/shops", { method: "GET" });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const shops: { name: string }[] = await response.json();
      this.items = this.createItems(shops);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  }

  createItems(shops: { name: string }[]): { label: string }[] {
    return shops.map(shop => ({
      label: shop.name,
      ...shop,
    }));
  }

  onSubmit(event: Event) {
    event.preventDefault();
    window.location.href = `mailto:email@example.com?subject=[${IDENTITIES_SELECT.find(identity => identity.value === this.state.identity)?.label}] ${this.state.subject}&body=${this.state.message}`;
  }

  render() {
    return html`
    <app-global-wrapper class="content" with-fullscreen id="content">
      <div class="space-y-4">
        <form @submit=${this.onSubmit}>
          <div class="flex space-x-4">
            <div class="flex-1">
              <label for="identity">Identité</label>
            <select id="identity" .value=${this.state.identity} @change=${(e: Event) => this.state.identity = (e.target as HTMLSelectElement).value as "student" | "teacher" | "company" | "other"}>
                ${IDENTITIES_SELECT.map(option => html`<option value=${option.value}>${option.label}</option>`)}
              </select>
            </div>
            <div class="flex-1">
              <label for="subject">Sujet</label>
              <input id="subject" type="text" .value=${this.state.subject} @input=${(e: Event) => this.state.subject = (e.target as HTMLInputElement).value} />
            </div>
          </div>
          <div>
            <label for="message">Message</label>
            <textarea id="message" .value=${this.state.message} @input=${(e: Event) => this.state.message = (e.target as HTMLTextAreaElement).value}></textarea>
          </div>
          <button type="submit" class="w-full">Envoyer</button>
        </form>
        <div>
          <h2>Shops</h2>
          <ul>
            ${this.items.map(item => html`<li>${item.label}</li>`)}
          </ul>
        </div>
      </div>
    </app-global-wrapper>

    `;
  }
}