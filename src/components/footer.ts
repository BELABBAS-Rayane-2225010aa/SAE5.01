import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { style } from '../styles/footer';

@customElement('app-footer')
export class Footer extends LitElement {
  // Define a state variable to track if the dark theme is enabled
  @state() isDarkTheme = false;

  // Apply the imported styles to this component
  static styles = style;

  // Lifecycle method called when the component is added to the DOM
  connectedCallback() {
    super.connectedCallback();
    // Check if the dark theme is enabled
    this.isDarkTheme = document.documentElement.classList.contains('dark');
  }

  // Render method to describe the component's template
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