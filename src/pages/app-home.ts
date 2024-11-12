import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { style } from '../styles/homepage';
import type { CardInfos } from "../components/card/cardPresentation";
import type { CardNavigationInfos } from "../components/card/cardNavigation";
import { definePageMeta } from "../meta";
import '../components/defaultBackground';

// page available without authentification
definePageMeta({
  auth: false,
});

// Nav menu options
const cardsNavigationInfos: CardNavigationInfos[] = [
  {
    title: "Technologies",
    description: "Découvrez les dernières technologies",
    path: "/technologies",
    iconUrl: "cpu",
  },
  {
    title: "Photovoltaïque",
    description: "Découvrez les panneaux solaires",
    path: "/photovoltaique",
    iconUrl: "table",
  },
  {
    title: "Epicerie solidaire",
    description: "Découvrez notre épicerie solidaire",
    path: "/epicerie-solidaire",
    iconUrl: "cart",
  },
  {
    title: "Météo",
    description: "Consultez la météo",
    path: "/meteo",
    iconUrl: "brightness-high",
  }
];

// Info cards
const cardsInfos: CardInfos[] = [
  {
    title: "Par les étudiants pour les étudiants !",
    subTitle: "",
    description:
      '"Nous proposons à ces étudiants des produits à 10% des prix du marchés, comme des paquets de pâtes à 7 centimes' +
      "\" - Alexandre Siméoni, président de la fédération Aix-Marseille Interasso.\n Depuis l'inoguration du magasin" +
      " connecté en 2019 plus de 650 étudiants ont bénéficié de ces tarifs préférentiels.",
    publicImage: "/images/mainPage_store.jpg",
    isReversed: false,
  },

  {
    title: "Un magasin a la pointe de la technologies",
    subTitle: "Vivez l'experience du client de demain",
    description:
      "Le magasin connecter a pour but de regroupé les technologies du futur et de les integré dans un contexte reel. " +
      "On y retrouve des technologies comme le LiFi, le recyclage de la lumière ambiante, l'eclairage circadien, " +
      "des drones, le RFID, l'IOT et la VLC",
    publicImage: "/images/mainPage_tech_img.png",
    isReversed: true,
  },
];

@customElement('app-home')
export class AppHome extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';

  static styles = [
    style
  ];

  render() {
    return html`
      <app-default-background></app-default-background>

      <app-scroll-button hash="#content"></app-scroll-button>

      <app-global-wrapper class="content" with-fullscreen id="content">
        <div class="card-default-container">
          ${cardsInfos.map(cardInfos => html`
            <app-card-presentation .cardInfos=${cardInfos}></app-card-presentation>
          `)}
        </div>

        <div class="card-navigation-container">
          ${cardsNavigationInfos.map(cardNavigationInfos => html`
            <app-card-navigation .cardNavigationInfos=${cardNavigationInfos}></app-card-navigation>
          `)}
        </div>

        <app-parteners></app-parteners>
      </app-global-wrapper>
    `;
  }
}