import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { User } from '../../models/user';
import './userManager';

interface UserWithConfirmPassword extends User {
  confirmPassword: string;
}

@customElement('admin-users-management')
export class UsersManagement extends LitElement {
  @property({ type: Array }) users: User[] = [];
  @state() isLoading: boolean = false;
  @state() indexUserSelected: number = 0;
  @state() managedUsers: UserWithConfirmPassword[] = [
    { email: 'Nouvel utilisateur', role: 'seller', password: '', confirmPassword: '' },
  ];

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.managedUsers.push(...this.users.map(user => ({ ...user, confirmPassword: '' })));
  }

  addUser(user: User) {
    this.managedUsers.push({ ...user, confirmPassword: '' });
  }

  render() {
    return html`
      <div class="container">
        <h3>User Management</h3>

        <select @change=${(e: Event) => this.indexUserSelected = this.managedUsers.findIndex(user => user.email === (e.target as HTMLSelectElement).value)}>
          ${this.managedUsers.map(user => html`<option value=${user.email}>${user.email}</option>`)}
        </select>

        <user-manager
          .user=${this.managedUsers[this.indexUserSelected]}
          .isNew=${this.indexUserSelected === 0}
          .addUser=${this.addUser.bind(this)}
        ></user-manager>
      </div>
    `;
  }
}