import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { style } from '../styles/footer';

@customElement('app-footer')
export class Footer extends LitElement {
  @state() isDarkTheme = false;

  static styles = style;

  connectedCallback() {
    super.connectedCallback();
    this.isDarkTheme = document.documentElement.classList.contains('dark');
  }

  render() {
    return html`
      <footer class="footer">
        <div class="container py-5 justify-center lg:justify-between">
          <div class="logo">
            <!-- Conditionally render the logo based on the dark theme state -->
            ${this.isDarkTheme
              ? html`<img src="footer/amu_logo_white.png" alt="Logo amu white" class="w-fit" />`
              : html`<img src="footer/amu_logo.png" alt="Logo amu" class="w-fit" />`}
          </div>

          <div>
            <h2 class="text-xl font-bold text-_primary-700 dark:text-white">Liens rapides</h2>
            <ul class="footer-menu">
              <!-- Navigation links to different sections of the site -->
              <li>
                <a href="/technologies" class="hover:text-blue-800">Technologies</a>
              </li>
              <li>
                <a href="/photovoltaique" class="hover:text-blue-800">Photovoltaique</a>
              </li>
              <li>
                <a href="/epicerie-solidaire" class="hover:text-blue-800">Epicerie Solidaire</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="text-xl font-bold text-_primary-700 dark:text-white">Magasin Connecté 4.0</h2>
            <p>
              IUT d’Aix-Marseille – Site de l’étoile<br />
              142 traverse Charles Susini 13013 Marseille
            </p>
          </div>
        </div>
      </footer>
    `;
  }
}