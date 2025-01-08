import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface ToastOptions {
  title: string;
  description: string;
  color?: string;
  duration?: number; // Duration in milliseconds
}

@customElement('toast-message')
export class ToastMessage extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: String }) color = 'black';
  @property({ type: Number }) duration = 3000; // Default duration 3 seconds

  static styles = css`
    .toast {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      color: var(--toast-color, black);
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      animation: fadeIn 0.5s, fadeOut 0.5s var(--toast-duration, 3000ms);
      z-index: 1000;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.style.setProperty('--toast-color', this.color);
    this.style.setProperty('--toast-duration', `${this.duration}ms`);
    this.addEventListener('mouseenter', this.stopTimer);
    this.addEventListener('mouseleave', this.startTimer);
    this.startTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mouseenter', this.stopTimer);
    this.removeEventListener('mouseleave', this.startTimer);
  }

  private timer: number | undefined;

  private startTimer() {
    this.timer = window.setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  private stopTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    return html`
      <div class="toast">
        <strong>${this.title}</strong>
        <p>${this.description}</p>
      </div>
    `;
  }
}

class UseToast {
  add(options: ToastOptions) {
    const toast = document.createElement('toast-message') as ToastMessage;
    toast.title = options.title;
    toast.description = options.description;
    toast.color = options.color || 'black';
    toast.duration = options.duration || 3000;
    document.body.appendChild(toast);
  }
}

export const useToast = new UseToast();