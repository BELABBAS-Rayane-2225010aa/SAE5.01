import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { User } from '../../models/user';
import sha256 from 'crypto-js/sha256';
import { useToast } from '../../composables/useToast';

// Define role constants
const ROLE_ENUM = ["admin"] as const;
const ROLE_RADIO = [
  { label: "Administrateur", value: ROLE_ENUM[0] },
];

// Define a new custom element with the name 'user-manager'
@customElement('user-manager')
export class UserManager extends LitElement {
  // Define a property 'user' of type User with default values
  @property({ type: Object }) user: User = { email: '', role: 'admin', password: '' };
  // Define a property 'isNew' to indicate if the user is new
  @property({ type: Boolean }) isNew: boolean = false;
  // Define a property 'addUser' which is a function to add a user
  @property({ attribute: false }) addUser: (user: User) => void = () => {};

  // Define state variables for form fields
  @state() email: string = this.user.email;
  @state() role: string = this.user.role;
  @state() password: string = '';
  @state() confirmPassword: string = '';

  // Define the styles for this component
  static styles = css`
    .user-management-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: start;
    }
  `;

  // Lifecycle method called when the component is updated
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

  // Method to handle form submission
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
        // Send a POST request to add a new user
        const response = await fetch('https://api-magasinconnecte.alwaysdata.net/src/endpoint/users/post.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          const data = await response.json();
          this.addUser(data);
          useToast.add({ title: 'Succès', description: 'L\'utilisateur a bien été ajouté', color: 'green' });
        } else {
          useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de l\'ajout de l\'utilisateur', color: 'red' });
        }
      } else {
        // Send a PUT request to update an existing user
        const response = await fetch('https://api-magasinconnecte.alwaysdata.net/src/endpoint/users/put.php', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          const data = await response.json();
          this.addUser(data);
          useToast.add({ title: 'Succès', description: 'L\'utilisateur a bien été modifié', color: 'green' });
        } else {
          useToast.add({ title: 'Erreur', description: 'Une erreur est survenue lors de la modification de l\'utilisateur', color: 'red' });
        }
      }
      this.resetForm();
    } catch (error) {
      console.error(error);
    }
  }

  // Method to reset the form fields
  resetForm() {
    this.email = '';
    this.role = ROLE_ENUM[0];
    this.password = '';
    this.confirmPassword = '';
  }

  // Render method to describe the component's template
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