import {css} from 'lit';

export const style = css`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      background: url('/assets/images/background.webp') no-repeat center center / cover;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    form {
      background-color: rgba(0, 0, 0, 0.8);
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      width: 300px;
      text-align: center;
    }

    label {
      display: block;
      color: #ffffff;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      font-weight: bold;
    }

    input {
      width: 100%;
      padding: 0.5rem;
      margin-bottom: 1rem;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      outline: none;
    }

    input:focus {
      border: 2px solid #1e90ff;
    }

    button {
      width: 100%;
      padding: 0.7rem;
      background: linear-gradient(45deg, #1e90ff, #00bfff);
      border: none;
      border-radius: 5px;
      color: #ffffff;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    button:disabled {
      background: #555;
      cursor: not-allowed;
    }

    button:hover:not(:disabled) {
      background: linear-gradient(45deg, #00bfff, #1e90ff);
    }
  `;