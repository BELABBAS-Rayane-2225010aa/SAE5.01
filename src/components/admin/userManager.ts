import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { User } from '../../models/user';
import sha256 from 'crypto-js/sha256';
import { useToast } from '../../composables/useToast';

const ROLE_ENUM = ["admin"] as const;
const ROLE_RADIO = [
  { label: "Administrateur", value: ROLE_ENUM[0] },
];

@customElement('user-manager')
export class UserManager extends LitElement {
  @property({ type: Object }) user: User = { email: '', role: 'admin', password: '' };
  @property({ type: Boolean }) isNew: boolean = false;
  @property({ attribute: false }) addUser: (user: User) => void = () => {};

  @state() email: string = this.user.email;
  @state() role: string = this.user.role;
  @state() password: string = '';
  @state() confirmPassword: string = '';

  static styles = css`
    .user-management-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: start;
    }
  `;

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('user')) {
      this.email = this.user.email;
      this.role = this.user.role;
      this.password = '';
      this.confirmPassword = '';
    }
    if (changedProperties.has('isNew') && this.isNew) {
      this.email = '';
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.password !== this.confirmPassword) {
      useToast.add({ title: 'Erreur', description: 'Les mots de passe ne correspondent pas', color: 'red' });
      return;
    }

    const userData = {
      email: this.email,
      role: this.role,
      password: sha256(this.password).toString(),
    };

    try {
      if (this.isNew) {
        const { UserPost } = await import("../../server/api/user/users.post");
        const response = new UserPost();
        const user = await response.post(userData);
        this.addUser(userData);
        if (user) {
          useToast.add({ title: 'Succès', description: 'L\'utilisateur a bien été ajouté', color: 'green' });
        }
        else {
            useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de l\'ajout de l\'utilisateur', color: 'red' });
        }
      }
      else {
        const { UserUpdate } = await import("../../server/api/user/user.update");
        const response = new UserUpdate();
        const user = await response.update(userData);
        if (user) {
          useToast.add({ title: 'Succès', description: 'L\'utilisateur a bien été mis à jour', color: 'green' });
        }
        else {
            useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur', color: 'red' });
        }
      }
      this.resetForm();
    } catch (error) {
      console.error(error);
    }
  }

  resetForm() {
    this.email = '';
    this.role = ROLE_ENUM[0];
    this.password = '';
    this.confirmPassword = '';
  }

  render() {
    return html`
      <form @submit=${this.onSubmit} class="user-management-container">
        ${this.isNew ? html`
          <label for="email">E-mail</label>
          <input id="email" type="email" .value=${this.email} @input=${(e: Event) => this.email = (e.target as HTMLInputElement).value} required />
        ` : ''}

        <label for="role">Role</label>
        ${ROLE_RADIO.map(roleOption => html`
          <label>
            <input type="radio" name="role" .value=${roleOption.value} .checked=${this.role === roleOption.value} @change=${(e: Event) => this.role = (e.target as HTMLInputElement).value} />
            ${roleOption.label}
          </label>
        `)}

        <label for="password">${this.isNew ? 'Password' : 'New Password'}</label>
        <input id="password" type="password" .value=${this.password} @input=${(e: Event) => this.password = (e.target as HTMLInputElement).value} required />

        <label for="confirmPassword">${this.isNew ? 'Confirm Password' : 'Confirm New Password'}</label>
        <input id="confirmPassword" type="password" .value=${this.confirmPassword} @input=${(e: Event) => this.confirmPassword = (e.target as HTMLInputElement).value} required />

        <button type="submit">${this.isNew ? 'Add' : 'Update'}</button>
      </form>
    `;
  }
}