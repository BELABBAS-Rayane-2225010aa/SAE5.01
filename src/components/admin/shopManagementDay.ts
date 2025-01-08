import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Day } from '../../models/shop';

@customElement('admin-shop-management-day')
export class AdminShopManagementDay extends LitElement {
  @property({ type: String }) dayName: string = '';
  @property({ type: Object }) day: Day = {
    day: '',
    morningStart: '',
    morningEnd: '',
    afternoonStart: '',
    afternoonEnd: '',
    isOpen: false,
    withBreak: false,
  };

  static styles = css`
    .form-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    }
  `;

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

  toggleBreak(withBreak: boolean): void {
    this.day.withBreak = withBreak;
    if (!withBreak) {
      this.day.afternoonStart = '';
      this.day.afternoonEnd = '';
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <label class="font-bold">${this.dayName}</label>
      <div class="form-container">
        <div class="flex gap-4">
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

          ${this.day.withBreak ? html`<span>et</span>` : ''}

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
          <div class="flex flex-col">
            <label>Lunch Break</label>
            <input
              type="checkbox"
              .checked=${this.day.withBreak}
              @change=${(e: Event) => this.toggleBreak((e.target as HTMLInputElement).checked)}
            />
          </div>

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