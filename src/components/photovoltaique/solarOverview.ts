import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Overview } from "../../models/photovoltaique/overview";


@customElement('solar-panel-overview')
export class SolarPanelOverview extends LitElement {
  @state() overviewData: Overview = {
    currentPower: 0,
    lifeTimeDataEnergy: 0,
    lastYearDataEnergy: 0,
    lastMonthDataEnergy: 0,
    lastDayDataEnergy: 0,
    lastUpdateTime: "",
  };

  static styles = css`
    @import url("~/assets/css/solarPanel/overview.css");
    .powers {
      margin-top: 1.25rem;
      position: relative;
    }
    .current-power {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .information {
      text-align: center;
    }
    .arrow {
      display: flex;
      align-items: center;
    }
    .line {
      width: 50px;
      height: 2px;
    }
    .point {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .solar-panel-illustration {
      width: 100px;
      height: auto;
    }
    .power-history {
      margin-top: 2rem;
      display: flex;
      justify-content: space-around;
    }
    .power {
      text-align: center;
    }
  `;

  async connectedCallback() {
    console.log("connectedCallback");
    super.connectedCallback();
    try {
      const response = await fetch("/api/solarPanel/v1/overview");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      this.overviewData = await response.json();
    } catch (error) {
      console.error(error);
      this.showToast("Une erreur est survenue lors de la récupération de données. Veuillez réessayer plus tard.", "red");
    }
  }

  showToast(message: string, color: string) {
    // Implement your toast notification logic here
    console.log(`Toast: ${message}, Color: ${color}`);
  }

  render() {
    return html`
      <page-header title="Laissons parler les chiffres" image="/photovoltaique/visualisation/header.jpg" image-alt="Panneaux solaires"></page-header>
      <section class="powers mt-5 relative">
        <div class="current-power">
          <div class="information">
            <h3>Puissance actuelle</h3>
            <p>${this.overviewData.currentPower} Watt</p>
          </div>

          <div class="arrow left">
            <div class="line bg-black dark:bg-white"></div>
            <div class="point border-black dark:border-white"></div>
          </div>

          <img src="/photovoltaique/visualisation/solarPanel.svg" alt="Solar panel illustration" class="solar-panel-illustration" />

          <div class="arrow right">
            <div class="line bg-black dark:bg-white"></div>
            <div class="point border-black dark:border-white"></div>
          </div>

          <div class="information">
            <h3>Production actuelle</h3>
            <p>Watt</p>
          </div>
        </div>

        <h2 class="font-bold text-2xl text-center mt-5">Energie produite</h2>

        <div class="power-history mt-8">
          <div class="power">
            <h3>Depuis l'installation</h3>
            <p>${this.overviewData.lifeTimeDataEnergy} Wh</p>
          </div>

          <div class="power">
            <h3>L'année précédente</h3>
            <p>${this.overviewData.lastYearDataEnergy} Wh</p>
          </div>

          <div class="power">
            <h3>Le mois précédent</h3>
            <p>${this.overviewData.lastMonthDataEnergy} Wh</p>
          </div>

          <div class="power">
            <h3>Le jour précédent</h3>
            <p>${this.overviewData.lastDayDataEnergy} Wh</p>
          </div>
        </div>
      </section>
    `;
  }
}