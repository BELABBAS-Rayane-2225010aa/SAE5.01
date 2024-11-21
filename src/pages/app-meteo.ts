import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';
import { Weather } from '../models/weather';
import { style } from '../styles/weather';
import { useToast } from '../composables/useToast';
import { handleWeatherRequest } from '../server/api/wheather';

@customElement('app-meteo')
export class WeatherComponent extends LitElement {
  @property({ type: Object }) weather: Weather | null = null;

  static styles = style;

  connectedCallback() {
    super.connectedCallback();
    this.fetchWeatherData();
  }

  async fetchWeatherData() {
    try {
      const weatherData = await handleWeatherRequest();
      this.weather = weatherData;
    } catch (error) {
        useToast.add({
            title: "Erreur",
            description: "Problème lors de la récupération des données météo ",
            color: "red"
          });
      console.error("Erreur lors de la récupération des données météo : ", error);
    }
  }

  render() {
    return html`
      <div class="container">
        <app-global-wrapper>
          <div class="container photovoltaique-wrap mx-auto text-lg">
            <page-header image="/meteo/header.png" image-alt="Donnée météorologique" title="Données météorologique"></page-header>

            <section class="mt-5 description bg-gradient-to-b from-blue-500 to-blue-700 p-6 rounded-lg shadow-lg text-center text-white">
              <h2 class="font-extrabold text-4xl text-white mb-4 uppercase">${this.weather?.cityName}</h2>

              <div class="flex flex-col items-center justify-center mt-4">
                <p class="text-6xl font-bold mb-2">${this.weather?.temperatureValue}°C</p>
                <p class="text-lg italic">${this.weather?.temperatureDescription}</p>

                <img
                  src="https://www.weatherbit.io/static/img/icons/${this.weather?.weatherIcon[0]}.png"
                  alt="Icon météo"
                  class="w-32 h-32 mt-6"
                />
              </div>

              <div class="grid grid-cols-2 gap-8 mt-8 border-t border-white pt-4">
                <div class="text-center">
                  <p class="text-sm">Lever du soleil</p>
                  <p class="text-lg font-semibold">${this.weather?.sunRise}</p>
                </div>
                <div class="text-center">
                  <p class="text-sm">Coucher du soleil</p>
                  <p class="text-lg font-semibold">${this.weather?.sunSet}</p>
                </div>
              </div>
            </section>
          </div>
        </app-global-wrapper>
      </div>
    `;
  }
}