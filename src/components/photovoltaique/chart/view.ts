import { html, css, LitElement, PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import Chart, { ChartData } from 'chart.js/auto';
import 'chartjs-adapter-moment';

@customElement('solar-panel-chart-view')
export class ChartsLineChart extends LitElement {
  // Define a property 'chartContext' of type ChartData<'line'> with default values
  @property({ type: Object }) chartContext: ChartData<'line'> = {
    labels: [],
    datasets: [],
  };
  // Define a property 'title' of type String
  @property({ type: String }) title = '';
  // Define a property 'chartKey' of type Number
  @property({ type: Number }) chartKey = 0;

  // Define the styles for this component
  static styles = css`
    .chart-wrap {
      height: 75vh;
    }
  `;

  // Lifecycle method called when the component is first updated
  firstUpdated() {
    this.createChart();
    window.addEventListener('resize', () => {
      this.chartKey++;
      this.createChart();
    });
  }

  // Lifecycle method called when the component is updated
  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('chartContext') || changedProperties.has('title')) {
      this.chartKey++;
      this.createChart();
    }
  }

  // Method to create the chart
  createChart() {
    if (!this.shadowRoot) return;
    const canvas = this.shadowRoot.getElementById('myChart') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: this.chartContext,
      options: {
        plugins: {
          title: {
            display: true,
            text: this.title,
            font: {
              size: 20,
              weight: 'bold',
            },
            color: document.documentElement.classList.contains('dark') ? '#FFF' : '#000',
          },
        },
        scales: {
          x: {
            type: 'time',
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              major: {
                enabled: true,
              },
              font: (context) => {
                if (context.tick && context.tick.major) {
                  return {
                    weight: 'bold',
                  };
                }
                return {};
              },
            },
          },
        },
      },
    });
  }

  // Render method to describe the component's template
  render() {
    return html`
      <div class="chart-wrap mb-10">
        <canvas id="myChart"></canvas>
      </div>
    `;
  }
}