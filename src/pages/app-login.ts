import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { z } from 'zod';
import sha256 from 'crypto-js/sha256';
import { useAuth } from '../composables/auth/useAuth';
import { useToast } from '../composables/useToast';
import {style} from '../styles/login';

@customElement('app-login')
export class LoginPage extends LitElement {
  @state() email = '';
  @state() password = '';
  @state() isLoading = false;

  static styles = [
      style
    ];

  schema = z.object({
    email: z.string().email("L'adresse mail est invalide").min(1, "Requis"),
    password: z.string().min(1, "Requis")
  });

  async onSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior
    this.isLoading = true;

    try {
      const user = await useAuth.signIn({
        email: this.email,
        password: sha256(this.password).toString()
      });
      localStorage.setItem('session', JSON.stringify(user));
      useToast.add({
        title: "Connexion",
        description: "Vous êtes connecté avec succès",
        color: "green"
      });
      window.location.href = "/administration";
    } catch (error) {
      useToast.add({
        title: "Erreur",
        description: "L'e-mail ou le mot de passe est incorrect",
        color: "red"
      });
    } finally {
      this.isLoading = false;
    }
  }

  render() {
    return html`
      <blur-background title="Connexion">
        <app-global-wrapper>
          <form @submit=${this.onSubmit}>
            <label for="email">E-mail</label>
            <input id="email" type="email" .value=${this.email} @input=${(e: any) => this.email = e.target.value} required>
            <label for="password">Mot de passe</label>
            <input id="password" type="password" .value=${this.password} @input=${(e: any) => this.password = e.target.value} required>
            <button type="submit" ?disabled=${this.isLoading}>Connexion</button>
          </form>
        </app-global-wrapper>
      </blur-background>
    `;
  }
}