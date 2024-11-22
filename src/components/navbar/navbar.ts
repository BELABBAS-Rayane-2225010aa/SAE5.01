import { LitElement, html } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import 'animate.css';


import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { style } from '../../styles/navbar';
import { Link, NavbarState } from '../../composables/navbar/useNavbar';
import { BackgroundState } from '../../composables/navbar/useBackground';

@customElement('app-navbar')
export class Navbar extends LitElement {

  private navbarState = new NavbarState();

  @state() isMenuOpen = false;
  @state() refLinks: Link[] = [];

  @property({ type: Boolean }) authenticated = false;

  static styles = style;
  private backgroundState: BackgroundState | null = null;

  constructor() {
    super();
    this.refLinks = this.navbarState.refLinks;
    this.navbarState.addObserver(() => {
      this.isMenuOpen = this.navbarState.isMenuOpen;
      this.refLinks = this.navbarState.refLinks;
    });

    // Add animate.css dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
    document.head.appendChild(link);
  }

  firstUpdated() {
    const navbarElement = this.shadowRoot?.querySelector('.navbar');
    this.backgroundState = new BackgroundState(navbarElement as HTMLElement | null);
    this.backgroundState.changeBackground();
    window.addEventListener('scroll', this.backgroundState.onScroll.bind(this.backgroundState));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.backgroundState) {
      window.removeEventListener('scroll', this.backgroundState.onScroll.bind(this.backgroundState));
    }
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
                              <button class="link-button" @click="${this.navbarState.toggleMenuWithSubLinks}">
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
                  class="menu-icon text-3xl cursor-pointer animate-__animated animate__flipInX animate__fast"
                  @click="${this.navbarState.toggleMenu}"
                >
                  <sl-icon name="list"></sl-icon>
                </button>
              `}

          <!-- Administration link with a tooltip -->
          <sl-tooltip content="Espace administration">
            <a href="/login" class="menu-icon">
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