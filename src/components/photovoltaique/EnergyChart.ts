import { html, css, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { EnergyDetails, EnergyDetailsData, EnergyDetailsMeter } from '../../models/photovoltaique/energy';
import { Filters } from '../../models/photovoltaique/filters';
import { SolarPanelTheoreticalProduction } from '../../models/photovoltaique/weatherReport';
import { useToast } from '../../composables/useToast';
import { useEnergyChartData } from '../../composables/photovoltaique/useEnergyChartData';
import moment from 'moment';

@customElement('solar-panel-energychart')
export class SolarPanelEnergyChart extends LitElement {
  // Define a property 'filters' of type Filters with default values
  @property({ type: Object }) filters: Filters = {
    startDate: navigator?.maxTouchPoints > 0 ? moment().subtract(1, 'days').toDate() : moment().subtract(7, "days").toDate(),
    endDate: new Date(),
    timeUnit: "HOUR",
  };

  // Define a property 'energyDetails' of type EnergyDetails with default values
  @property({ type: Object }) energyDetails: EnergyDetails = {
    timeUnit: "HOUR",
    unit: "kWh",
    meters: [],
  };

  // Define a property 'theoreticalProduction' of type SolarPanelTheoreticalProduction array with default values
  @property({ type: Array }) theoreticalProduction: SolarPanelTheoreticalProduction[] = [{
    date: "0000-00-00 00:00:00",
    production: 0,
  }];

  // Define a property 'chartContext' of type any with default values
  @property({ type: Object }) chartContext: any = {
    title: "Production de l'énergie",
    datasets: [],
  };

  // Define the styles for this component
  static styles = css`
    .energy-chart {
      position: relative;
    }

    .filters-wrap {
      position: absolute;
      top: 0;
      right: 75px;
      z-index: 9;
    }

    @media screen and (max-width: 768px) {
      .filters-wrap {
        top: -50px;
        right: 0;
      }
    }

    .refresh-wrap {
      position: absolute;
      top: 0;
      right: 25px;
      z-index: 9;

      button {
        padding: 12px;
        font-size: 1.2em;
      }
    }

    @media screen and (max-width: 768px) {
      .refresh-wrap {
        top: -50px;
        right: 50px;
      }
    }
  `;

  // Lifecycle method called when the component is added to the DOM
  async connectedCallback() {
    super.connectedCallback();
    await this.getData();
    this.initializeChartContext();
  }

  // Method to fetch data from the API
  async getData() {
    const { formatDateTime, formatWeatherValue } = useEnergyChartData();
    let energyDetailsResponse: EnergyDetails = {
      timeUnit: "HOUR",
      unit: "kWh",
      meters: [],
    };
    let theoreticalProductionResponse: SolarPanelTheoreticalProduction[] = [{
      date: "0000-00-00 00:00:00",
      production: 0,
    }];

    try {
      const results = await Promise.allSettled([
        // Fetch energy details from API
        fetch(`/api/solarPanel/v1/energyDetails?serialNumber=156&from=${formatDateTime(this.filters.startDate)}&to=${formatDateTime(this.filters.endDate)}&resolution=${this.filters.timeUnit}`, {
          method: "GET",
        }).then(res => res.json()),

        // Fetch theoretical production values
        formatWeatherValue(this.filters),
      ]);

      // Handle the response for energy details
      if (results[0].status === "fulfilled") {
        energyDetailsResponse = results[0].value as EnergyDetails;
      } else {
        console.error("Failed to fetch energy details:", results[0].reason);
        useToast.add({
          description: "Une erreur est survenue lors de la récupération des détails énergétiques",
          title: "Erreur",
          color: "red",
        });
      }

      // Handle the response for theoretical production
      if (results[1].status === "fulfilled") {
        theoreticalProductionResponse = results[1].value as SolarPanelTheoreticalProduction[];
      } else {
        console.error("Failed to fetch theoretical production:", results[1].reason);
        useToast.add({
          description: "Une erreur est survenue lors de la récupération de la production théorique",
          title: "Erreur",
          color: "red",
        });
      }
    } catch (error) {
      // Handle other errors
      useToast.add({
        description: "Une erreur générale est survenue lors de la récupération des données",
        title: "Erreur",
        color: "red",
      });
    }

    // Update state with fetched data
    this.energyDetails = energyDetailsResponse;
    this.theoreticalProduction = theoreticalProductionResponse;
    this.updateChartContext();
  }

  // Method to format date and time
  formatDateTime(date: Date) {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss');
  }

  // Method to get string representation of time unit
  getStringByTimeUnit(timeUnit: string) {
    switch (timeUnit) {
      case "QUARTER_OF_AN_HOUR":
        return "15 min";
      case "HOUR":
        return "heure";
      case "DAY":
        return "jour";
      case "WEEK":
        return "semaine";
      case "MONTH":
        return "mois";
      case "YEAR":
        return "année";
      default:
        return "temps";
    }
  }

  // Method to update the chart context with new data
  updateChartContext() {
    const productionData = this.energyDetails.meters.find((meter: EnergyDetailsMeter) => meter.type === "Production")?.values.map((v: EnergyDetailsData) => ({
      x: v.date,
      y: v.value ?? 0,
    })) || [];
    const consumptionData = this.energyDetails.meters.find((meter: EnergyDetailsMeter) => meter.type === "Consumption")?.values.map((v: EnergyDetailsData) => ({
      x: v.date,
      y: v.value ?? 0,
    })) || [];
    const differenceData = productionData.map((v, i) => ({ x: v.x, y: (v.y ?? 0) - (consumptionData[i]?.y ?? 0) }));
    const theoreticalData = this.theoreticalProduction.map((v: SolarPanelTheoreticalProduction) => ({
      x: v.date,
      y: v.production,
    }));

    this.chartContext.datasets = [
      {
        label: `Production de l'énergie par ${this.getStringByTimeUnit(this.energyDetails.timeUnit)} (${this.energyDetails.unit})`,
        backgroundColor: '#000000', // Black color in hexadecimal
        borderColor: '#2D3748', // Custom color in hexadecimal
        data: productionData,
      },
      {
        label: `Production théorique de l'énergie par ${this.getStringByTimeUnit(this.energyDetails.timeUnit)} (${this.energyDetails.unit})`,
        backgroundColor: '#000000', // Black color in hexadecimal
        borderColor: '#A0AEC0', // Custom color in hexadecimal
        data: theoreticalData,
      },
      {
        label: `Consommation de l'énergie par ${this.getStringByTimeUnit(this.energyDetails.timeUnit)} (${this.energyDetails.unit})`,
        backgroundColor: '#000000', // Black color in hexadecimal
        borderColor: '#4A5568', // Custom color in hexadecimal
        data: consumptionData,
      },
      {
        label: `Différence entre la production et la consommation de l'énergie par ${this.getStringByTimeUnit(this.energyDetails.timeUnit)} (${this.energyDetails.unit})`,
        backgroundColor: '#000000', // Black color in hexadecimal
        borderColor: '#CBD5E0', // Custom color in hexadecimal
        data: differenceData,
        hidden: true,
      },
    ];
  }

  // Method to initialize the chart context with default data
  initializeChartContext() {
    this.chartContext = {
      title: "Production de l'énergie",
      datasets: [
        {
          label: `Production de l'énergie par ${this.getStringByTimeUnit(this.energyDetails.timeUnit)} (${this.energyDetails.unit})`,
          backgroundColor: '#000000', // Black color in hexadecimal
          borderColor: '#2D3748', // Custom color in hexadecimal
          data: this.energyDetails.meters.find(meter => meter.type === "Production")?.values.map(v => {
            return { x: v.date, y: v.value ?? 0 };
          }),
        },
        {
          label: `Production théorique de l'énergie par ${this.getStringByTimeUnit(this.energyDetails.timeUnit)} (${this.energyDetails.unit})`,
          backgroundColor: '#000000', // Black color in hexadecimal
          borderColor: '#A0AEC0', // Custom color in hexadecimal
          data: this.theoreticalProduction.map((v: SolarPanelTheoreticalProduction) => ({ x: v.date, y: v.production })),
        },
        {
          label: `Consommation de l'énergie par ${this.getStringByTimeUnit(this.energyDetails.timeUnit)} (${this.energyDetails.unit})`,
          backgroundColor: '#000000', // Black color in hexadecimal
          borderColor: '#4A5568', // Custom color in hexadecimal
          data: this.energyDetails.meters.find(meter => meter.type === "Consumption")?.values.map(v => {
            return { x: v.date, y: v.value ?? 0 };
          }),
        },
        {
          label: `Différence entre la production et la consommation de l'énergie par ${this.getStringByTimeUnit(this.energyDetails.timeUnit)} (${this.energyDetails.unit})`,
          backgroundColor: '#000000', // Black color in hexadecimal
          borderColor: '#CBD5E0', // Custom color in hexadecimal
          data: this.energyDetails.meters.find(meter => meter.type === "Production")?.values.map((v, i) => {
            return {
              x: v.date,
              y: (v.value ?? 0) - (this.energyDetails.meters.find(meter => meter.type === "Consumption")?.values[i].value ?? 0),
            };
          }),
          hidden: true,
        },
      ],
    };
  }

  // Render method to describe the component's template
  render() {
    return html`
      <div class="energy-chart">
        <solar-panel-chart-view .chartContext="${this.chartContext}" title="Production de l'énergie"></solar-panel-chart-view>
        <div class="filters-wrap">
          <solar-panel-chart-filters .filters="${this.filters}"></solar-panel-chart-filters>
        </div>

        <div class="refresh-wrap">
          <u-tooltip text="Rafraîchit les données">
            <u-button @click="${this.getData}" variant="link" size="xl"><u-icon name="i-heroicons-arrow-path"></u-icon></u-button>
          </u-tooltip>
        </div>
      </div>
    `;
  }
}