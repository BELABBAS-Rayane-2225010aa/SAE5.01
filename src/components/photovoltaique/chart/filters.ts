import { html, css, LitElement } from 'lit';
import { property, customElement, state } from 'lit/decorators.js';
import moment from 'moment';
import { Filters } from '../../../models/photovoltaique/filters'; // Ensure the correct path to your Filters type file

@customElement('solar-panel-chart-filters')
export class FiltersPopover extends LitElement {
  // Define a property 'filters' of type Filters with default values
  @property({ type: Object }) filters: Filters = {
    startDate: moment().subtract(7, 'days').toDate(),
    endDate: new Date(),
    timeUnit: 'HOUR',
  };

  // Define state variables for options and date formats
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

  // Stacks for undo and redo functionality
  undoStack: Filters[] = [];
  redoStack: Filters[] = [];

  // Define the styles for this component
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

  // Method to reset the filters to default values
  reset() {
    this.filters.startDate = moment().subtract(7, 'days').toDate();
    this.filters.endDate = new Date();
    this.filters.timeUnit = 'HOUR';
    this.updateFilters();
  }

  // Method to update the filters and manage undo/redo stacks
  updateFilters() {
    if (this.undoStack.length === 0 || JSON.stringify(this.undoStack[this.undoStack.length - 1]) !== JSON.stringify(this.filters)) {
      this.undoStack.push({ ...this.filters });
      this.redoStack = [];
    }
  }

  // Method to undo the last filter change
  undo() {
    if (this.undoStack.length > 1) {
      const popStack = this.undoStack.pop();
      if (popStack) {
        this.redoStack.push(popStack);
      }
      const lastState = this.undoStack[this.undoStack.length - 1];
      if (lastState) {
        this.filters = { ...lastState };
      }
    }
  }

  // Method to redo the last undone filter change
  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push({ ...this.filters });
      const nextState = this.redoStack.pop();
      if (nextState) {
        this.filters = { ...nextState };
      }
    }
  }

  // Method to handle keyboard shortcuts for undo/redo
  handleKeyDown(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    if ((event.key === 'z' || event.key === 'Z') && (event.ctrlKey || event.metaKey)) {
      event.shiftKey ? this.redo() : this.undo();
      event.preventDefault();
    }
  }

  // Lifecycle method called when the component is added to the DOM
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  // Lifecycle method called when the component is removed from the DOM
  disconnectedCallback() {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    super.disconnectedCallback();
  }

  // Render method to describe the component's template
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
                  @click="${() => (this.filters.timeUnit = option.value as 'HOUR' | 'QUARTER_OF_AN_HOUR' | 'DAY' | 'WEEK' | 'MONTH' | 'YEAR')}"
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
              .value="${moment(this.filters.startDate).format('YYYY-MM-DDTHH:mm:ss')}"
              @input="${(e: Event) => {
                const input = e.target as HTMLInputElement;
                this.filters.startDate = new Date(input.value);
              }}"
              id="startDate"
            />
          </div>
          <div>
            <label for="endDate">Date de fin</label>
            <input
              type="datetime-local"
              .value="${moment(this.filters.endDate).format('YYYY-MM-DDTHH:mm:ss')}"
              @input="${(e: Event) => {
                const input = e.target as HTMLInputElement;
                this.filters.endDate = new Date(input.value);
              }}"
              id="endDate"
            />
          </div>
        </div>
      </div>
    `;
  }
}