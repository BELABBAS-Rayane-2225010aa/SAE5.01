import { html, css, LitElement, PropertyValues } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import Chart, { ChartData } from 'chart.js/auto';
import 'chartjs-adapter-moment';

@customElement('solar-panel-chart-view')
export class ChartsLineChart extends LitElement {
    @property({ type: Object }) chartContext: ChartData<'line'> = {
        labels: [],
        datasets: [],
      };  @property({ type: String }) title = '';
  @property({ type: Number }) chartKey = 0;

  static styles = css`
    .chart-wrap {
      height: 75vh;
    }
  `;

  firstUpdated() {
    this.createChart();
    window.addEventListener('resize', () => {
      this.chartKey++;
      this.createChart();
    });
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('chartContext') || changedProperties.has('title')) {
      this.chartKey++;
      this.createChart();
    }
  }

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

  render() {
    return html`
      <div class="chart-wrap mb-10">
        <canvas id="myChart"></canvas>
      </div>
    `;
  }
}