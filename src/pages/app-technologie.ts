import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { style } from '../styles/technologie';
import { Techno } from '../models/techno';
import { definePageMeta } from "../meta";

import '../components/card/technologie/cardTechno.js';
import '../components/card/technologie/cardDescription.ts';
import '../components/card/technologie/cardNavigation.ts';


// page available without authentication
definePageMeta({
  auth: false,
});

const technoCards: Techno[] = [
  {
    title: "LI-FI",
    icon: "i-heroicons-wifi-16-solid",
    image: "/assets/images/technologie/lifi.png",
    shortDescription:
      "Utilise la lumière pour transmettre des données, offrant une alternative rapide et sécurisée au Wi-Fi traditionnel.",
    functioningImage: "/assets/images/technologie/screenshots/LIFI.png",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "lifi",
  },
  {
    title: "VLC",
    icon: "i-heroicons-light-bulb-16-solid",
    shortDescription:
      "Le VLC (Visible Light Communication) est une technologie de transmission de données unidirectionnelle via la lumière LED.",
    functioningImage: "/assets/images/technologie/screenshots/VLC.png",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "vlc",
    image: "/assets/images/technologie/vlc.png",
  },
  {
    title: "Drones",
    icon: "i-heroicons-rocket-launch-16-solid",
    shortDescription:
      "Les drones sont des appareils sans équipage, pilotés automatiquement ou à distance, utilisés dans le civil ou par les forces armées et de sécurité.",
    functioningImage: "/assets/images/technologie/screenshots/drone.jpg",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "drones",
    image: "/assets/images/technologie/drone.png",
  },
  {
    title: "Diffuseur de Parfum",
    icon: "i-heroicons-arrow-up-on-square-16-solid",
    shortDescription:
      "Crée une ambiance olfactive agréable dans le magasin, enrichissant l'expérience des visiteurs.",
    functioningImage: "/assets/images/technologie/diffuseur_parfum.png",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "cso",
    image: "/assets/images/technologie/diffuseur_parfum.png",
  },
  {
    title: "RFID",
    icon: "i-heroicons-circle-stack-16-solid",
    shortDescription:
      "Facilitent la gestion et le suivi des stocks grâce à l'identification par radiofréquence, améliorant ainsi l'efficacité logistique.",
    functioningImage: "/assets/images/technologie/screenshots/RFID.png",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "rfid",
    image: "/assets/images/technologie/rfid.png",
  },
  {
    title: "Acoustique",
    icon: "i-heroicons-megaphone-16-solid",
    shortDescription:
      "Améliorent l'acoustique de l'espace, réduisant les nuisances sonores et créant un environnement propice à la concentration et à l'apprentissage.",
    functioningImage: "/assets/images/technologie/screenshots/acoustique.png",
    installImage: "",
    functioningDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    installDescription:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nobis. Corporis quod deleniti repellat deserunt ratione expedita dicta rem odit, culpa, ipsa esse doloribus tenetur doloremque, dolorem quisquam repellendus? Sunt",
    link: "acoustique",
    image: "/assets/images/technologie/acoustique.png",
  },
];

@customElement('app-technologie')
export class AppTechnologie extends LitElement {

  static styles = [
    style
  ];

  render() {

    return html`
      <app-global-wrapper class="techno-wrapper">
        <main-title text="Nos technologies"></main-title>

        <div class="content-techno">
          ${technoCards.map(technoCard => html`
            <app-techno-card .technoCard=${technoCard}></app-techno-card>
          `)}
        </div>

        <div class="content-description">
          ${technoCards.map(technoCard => html`
            <app-techno-description .technoCard=${technoCard}></app-techno-description>
          `)}
        </div>

        <app-techno-navigation .technoCard=${technoCards}></app-techno-navigation>
      </app-global-wrapper>
    `;
  }
}