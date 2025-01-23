import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Day } from '../../models/calendar';

// Define a new custom element with the name 'admin-shop-management-day'
@customElement('admin-shop-management-day')
export class AdminShopManagementDay extends LitElement {
  // Define a property 'day' of type Day with default values
  @property({ type: Object }) day: Day = {
    day: '',
    morningStart: '',
    morningEnd: '',
    afternoonStart: '',
    afternoonEnd: '',
    isOpen: false,
    withBreak: false,
  };

  // Define the styles for this component
  static styles = css`
    .form-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    }
  `;

  // Method to toggle the open/close status of the shop
  toggleClose(isOpen: boolean): void {
    this.day.isOpen = isOpen;
    if (!isOpen) {
      this.day.morningStart = '';
      this.day.morningEnd = '';
      this.day.afternoonStart = '';
      this.day.afternoonEnd = '';
    }
    this.requestUpdate();
  }

  // Method to toggle the break status of the shop
  toggleBreak(withBreak: boolean): void {
    this.day.withBreak = withBreak;
    if (!withBreak) {
      this.day.afternoonStart = '';
      this.day.afternoonEnd = '';
    }
    this.requestUpdate();
  }

  // Render method to describe the component's template
  render() {
    return html`
      <label class="font-bold">${this.day.day}</label>
      <div class="form-container">
        <div class="flex gap-4">
          <!-- Input for morning start time -->
          <input
            class="w-fit"
            type="time"
            .value=${this.day.morningStart ?? ''}
            @input=${(e: Event) => {
              this.day.morningStart = (e.target as HTMLInputElement).value;
              this.requestUpdate();
            }}
            ?disabled=${!this.day.isOpen}
          />
          <!-- Input for morning end time -->
          <input
            class="w-fit"
            type="time"
            .value=${this.day.morningEnd ?? ''}
            @input=${(e: Event) => {
              this.day.morningEnd = (e.target as HTMLInputElement).value;
              this.requestUpdate();
            }}
            ?disabled=${!this.day.isOpen}
          />

          <!-- Display 'et' if there is a break -->
          ${this.day.withBreak ? html`<span>et</span>` : ''}

          <!-- Inputs for afternoon start and end time if there is a break -->
          ${this.day.withBreak ? html`
            <input
              class="w-fit"
              type="time"
              .value=${this.day.afternoonStart ?? ''}
              @input=${(e: Event) => {
                this.day.afternoonStart = (e.target as HTMLInputElement).value;
                this.requestUpdate();
              }}
              ?disabled=${!this.day.isOpen}
            />
            <input
              class="w-fit"
              type="time"
              .value=${this.day.afternoonEnd ?? ''}
              @input=${(e: Event) => {
                this.day.afternoonEnd = (e.target as HTMLInputElement).value;
                this.requestUpdate();
              }}
              ?disabled=${!this.day.isOpen}
            />
          ` : ''}
        </div>

        <div class="flex gap-3">
          <!-- Checkbox to toggle lunch break -->
          <div class="flex flex-col">
            <label>Lunch Break</label>
            <input
              type="checkbox"
              .checked=${this.day.withBreak}
              @change=${(e: Event) => this.toggleBreak((e.target as HTMLInputElement).checked)}
            />
          </div>

          <!-- Checkbox to toggle open status -->
          <div class="flex flex-col">
            <label>Open</label>
            <input
              type="checkbox"
              .checked=${this.day.isOpen}
              @change=${(e: Event) => this.toggleClose((e.target as HTMLInputElement).checked)}
            />
          </div>
        </div>
      </div>

      <hr class="mt-2" />
    `;
  }
}