import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { style } from '../styles/parteners';
import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('app-parteners')
export class Parteners extends LitElement {
  // Define a constant array of strings representing the image links for the partners
  private static readonly PARTENERS_IMAGES_LINK: string[] = [
    "parteners/ikea.svg.webp",
    "parteners/lucibel.webp",
    "parteners/murati.webp",
    "parteners/stid.webp",
    "parteners/auchan.webp",
    "parteners/connectwave.webp",
    "parteners/insiteo.webp",
    "parteners/dracula.webp",
    "parteners/lopcommerce.webp",
    "parteners/eurofins.webp",
  ];

  // Apply the imported styles to this component
  static styles = style;

  // Render method to describe the component's template
  render() {
    return html`
      <!-- Container for the partners section -->
      <div class="parteners__container">
        <!-- Description section for the partners -->
        <div class="parteners__description">
          <!-- Title for the partners section -->
          <h2 class="text-xl font-bold text-primary-500 text-left md:text-right">
            Nos partenaires
          </h2>
          <!-- Subtitle for the partners section -->
          <h3 class="italic text-left md:text-right">
            lorem ipsum lorem ipsum lorem
          </h3>
          <!-- Divider for the description section, visible on medium and larger screens -->
          <div class="hidden md:flex" style="height: 1px; background-color: #ccc; margin: 1em 0;"></div>
          <!-- Paragraph describing the partners -->
          <p class="text-left md:text-right">
            lorem ipsum lorem ipum lorem ipsumlorem ipsum lorem ipsum lorem ipsum
            lorem ipsumlorem ipsum
          </p>
        </div>

        <!-- Vertical divider, visible on medium and larger screens -->
        <div class="hidden md:flex" style="width: 1px; background-color: #ccc; margin: 1em 0;"></div>

        <!-- Horizontal divider, visible on small screens -->
        <div class="md:hidden" style="height: 1px; background-color: #ccc; margin: 1em 0;"></div>

        <!-- Container for the partner images -->
        <div class="parteners__images">
          <!-- Loop through the PARTENERS_IMAGES_LINK array and render each image -->
          ${Parteners.PARTENERS_IMAGES_LINK.map(
            (image, index) => html`
              <div class="image" key=${index}>
                <img src=${image} alt="logo ${image.split('.')[0]}" />
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}