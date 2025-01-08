import { css } from 'lit';

export const style = css`.container {
      max-width: 800px;
      margin: 0 auto;
      padding: 16px;
    }
    .description {
      background: linear-gradient(to bottom, #4299e1, #2b6cb0);
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      color: white;
    }
    .text-lg {
      font-size: 1.125rem;
    }
    .text-4xl {
      font-size: 2.25rem;
    }
    .text-6xl {
      font-size: 3.75rem;
    }
    .font-bold {
      font-weight: bold;
    }
    .font-extrabold {
      font-weight: 800;
    }
    .italic {
      font-style: italic;
    }
    .uppercase {
      text-transform: uppercase;
    }
    .mt-4 {
      margin-top: 1rem;
    }
    .mt-5 {
      margin-top: 1.25rem;
    }
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    .mb-4 {
      margin-bottom: 1rem;
    }
    .w-32 {
      width: 8rem;
    }
    .h-32 {
      height: 8rem;
    }
    .grid {
      display: grid;
    }
    .grid-cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    .gap-8 {
      gap: 2rem;
    }
    .border-t {
      border-top: 1px solid white;
    }
    .pt-4 {
      padding-top: 1rem;
    }
  `;
