import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { User } from '../../models/user';
import './userManager';

interface UserWithConfirmPassword extends User {
  confirmPassword: string;
}

// Define a new custom element with the name 'admin-users-management'
@customElement('admin-users-management')
export class UsersManagement extends LitElement {
  // Define a property 'users' of type User array with default empty array
  @property({ type: Array }) users: User[] = [];
  // Define state variables for loading state, selected user index, and managed users
  @state() isLoading: boolean = false;
  @state() indexUserSelected: number = 0;
  @state() managedUsers: UserWithConfirmPassword[] = [
    { email: 'Nouvel utilisateur', role: 'admin', password: '', confirmPassword: '' },
  ];

  // Define the styles for this component
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  `;

  // Lifecycle method called when the component is added to the DOM
  connectedCallback() {
    super.connectedCallback();
    // Initialize managedUsers with existing users
    this.managedUsers.push(...this.users.map(user => ({ ...user, confirmPassword: '' })));
  }

  // Method to add a new user
  addUser(user: User) {
    this.managedUsers.push({ ...user, confirmPassword: '' });
  }

  // Render method to describe the component's template
  render() {
    return html`
      <div class="container">
        <h3>User Management</h3>

        <!-- Dropdown to select a user -->
        <select @change=${(e: Event) => this.indexUserSelected = this.managedUsers.findIndex(user => user.email === (e.target as HTMLSelectElement).value)}>
          ${this.managedUsers.map(user => html`<option value=${user.email}>${user.email}</option>`)}
        </select>

        <!-- User manager component to manage the selected user -->
        <user-manager
          .user=${this.managedUsers[this.indexUserSelected]}
          .isNew=${this.indexUserSelected === 0}
          .addUser=${this.addUser.bind(this)}
        ></user-manager>
      </div>
    `;
  }
}