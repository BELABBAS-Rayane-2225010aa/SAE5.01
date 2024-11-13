import { LitElement, html } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { style } from '../styles/navbar';

@customElement('app-navbar')
export class Navbar extends LitElement {
  @state() isMenuOpen = false;
  @state() refLinks = [
    { name: 'Home', path: '/' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Photovoltaïque', path: '/photovoltaique' },
    { name: 'Epicerie solidaire', path: '/epicerie-solidaire' },
    { name: 'Météo', path: '/meteo' },
    { name: 'Retour', icon: 'arrow-left', onClick: () => this.toggleMenu() }
  ];

  @property({ type: Boolean }) authenticated = false;

  static styles = style;

  private toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private toggleMenuWithSubLinks() {
    // Implement the logic for toggling menu with sub-links
  }

  private onSignOut() {
    // Implement the logic for sign out
  }

  render() {
    return html`
      <!-- Navbar container -->
      <nav class="navbar">
        <!-- Navbar title with a link to the home page -->
        <h1 class="text-xl md:text-3xl text-white font-bold animate__animated animate__fadeInLeft animate__fast">
          <a href="/">Magasin Connecté 4.0</a>
        </h1>

        <!-- Navbar menu container -->
        <div class="navbar-menu-container">
          <!-- Menu items, conditionally rendered based on isMenuOpen -->
          ${this.isMenuOpen
            ? html`
                <ul class="menu">
                  ${this.refLinks.map(
                    (refLink) => html`
                      <li class="animate__animated animate__fadeInDown animate__faster">
                        ${refLink.name !== 'Photovoltaïque' && refLink.name !== 'Retour'
                          ? html`
                              <a href="${ifDefined(refLink.path)}" class="link-button">${refLink.name}</a>
                            `
                          : refLink.name === 'Retour'
                          ? html`
                              <button class="link-button" @click="${refLink.onClick}">
                                <sl-icon name="${ifDefined(refLink.icon)}"></sl-icon>
                              </button>
                            `
                          : html`
                              <button class="link-button" @click="${this.toggleMenuWithSubLinks}">
                                ${refLink.name}
                              </button>
                            `}
                      </li>
                    `
                  )}
                </ul>
              `
            : html`
                <button
                  class="menu-icon text-3xl cursor-pointer animate__animated animate__flipInX animate__fast"
                  @click="${this.toggleMenu}"
                >
                  <sl-icon name="list"></sl-icon>
                </button>
              `}

          <!-- Administration link with a tooltip -->
          <sl-tooltip content="Espace administration">
            <a href="/administration" class="menu-icon">
              <sl-icon name="person"></sl-icon>
            </a>
          </sl-tooltip>

          <!-- Sign out button with a tooltip, conditionally rendered based on authentication status -->
          ${this.authenticated
            ? html`
                <sl-tooltip content="Déconnexion">
                  <button class="menu-icon" @click="${this.onSignOut}">
                    <sl-icon name="box-arrow-right"></sl-icon>
                  </button>
                </sl-tooltip>
              `
            : ''}
        </div>
      </nav>
    `;
  }
}