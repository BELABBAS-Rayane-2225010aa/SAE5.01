import { html, css, LitElement } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import moment from 'moment';

@customElement('filters-popover')
export class FiltersPopover extends LitElement {
  @property({ type: Object }) filters = {
    startDate: moment().subtract(7, 'days').toDate(),
    endDate: new Date(),
    timeUnit: 'HOUR',
  };

  @state() options = [
    { value: 'QUARTER_OF_AN_HOUR', text: '15 min' },
    { value: 'HOUR', text: 'heure' },
    { value: 'DAY', text: 'jour' },
    { value: 'WEEK', text: 'semaine' },
    { value: 'MONTH', text: 'mois' },
    { value: 'YEAR', text: 'année' },
  ];

  @state() startDateISO = moment(this.filters.startDate).format('YYYY-MM-DDTHH:mm:ss');
  @state() endDateISO = moment(this.filters.endDate).format('YYYY-MM-DDTHH:mm:ss');

  undoStack = [];
  redoStack = [];

  static styles = css`
    .chart-wrap {
      height: 75vh;
    }
    .popover-content {
      background: white;
      color: black;
    }
    .filter-button {
      font-size: 1.2em;
    }
    .btn-float {
      margin: 5px;
    }
    .filters-popover-wrap {
      padding: 10px;
    }
    .custom-select {
      display: flex;
      flex-direction: column;
    }
    .custom-option {
      padding: 5px;
      cursor: pointer;
    }
    .selected-option {
      font-weight: bold;
    }
  `;

  constructor() {
    super();
    this.undoStack.push({ ...this.filters });
  }

  reset() {
    this.filters.startDate = moment().subtract(7, 'days').toDate();
    this.filters.endDate = new Date();
    this.filters.timeUnit = 'HOUR';
    this.updateFilters();
  }

  updateFilters() {
    if (this.undoStack.length === 0 || JSON.stringify(this.undoStack[this.undoStack.length - 1]) !== JSON.stringify(this.filters)) {
      this.undoStack.push({ ...this.filters });
      this.redoStack = [];
    }
  }

  undo() {
    if (this.undoStack.length > 1) {
      this.redoStack.push(this.undoStack.pop());
      const lastState = this.undoStack[this.undoStack.length - 1];
      this.filters = { ...lastState };
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push({ ...this.filters });
      const nextState = this.redoStack.pop();
      this.filters = { ...nextState };
    }
  }

  handleKeyDown(event) {
    event.stopImmediatePropagation();
    if ((event.key === 'z' || event.key === 'Z') && (event.ctrlKey || event.metaKey)) {
      event.shiftKey ? this.redo() : this.undo();
      event.preventDefault();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    super.disconnectedCallback();
  }

  render() {
    return html`
      <div class="popover-content">
        <button class="filter-button" @click="${this.reset}">Reset</button>
        <button class="filter-button" @click="${this.undo}">Undo</button>
        <button class="filter-button" @click="${this.redo}">Redo</button>
        <div class="filters-popover-wrap">
          <h2>Plage de temps</h2>
          <div class="custom-select">
            ${this.options.map(
              (option) => html`
                <div
                  class="custom-option ${this.filters.timeUnit === option.value ? 'selected-option' : ''}"
                  @click="${() => (this.filters.timeUnit = option.value)}"
                >
                  ${option.text}
                </div>
              `
            )}
          </div>
          <div>
            <label for="startDate">Date de début</label>
            <input
              type="datetime-local"
              .value="${this.startDateISO}"
              @input="${(e) => {
                this.startDateISO = e.target.value;
                this.filters.startDate = new Date(e.target.value);
              }}"
              id="startDate"
            />
          </div>
          <div>
            <label for="endDate">Date de fin</label>
            <input
              type="datetime-local"
              .value="${this.endDateISO}"
              @input="${(e) => {
                this.endDateISO = e.target.value;
                this.filters.endDate = new Date(e.target.value);
              }}"
              id="endDate"
            />
          </div>
        </div>
      </div>
    `;
  }
}