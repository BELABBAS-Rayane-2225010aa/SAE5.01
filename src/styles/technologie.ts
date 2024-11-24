import { css } from 'lit';

export const style = css`
  .content-techno {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 50px;
  }

  .content-description {
    display: flex;
    flex-direction: column;
    gap: 100px;
    margin-top: 150px;
  }

  .is-visible {
    opacity: 1;
    transition: 0.3s ease-in-out;
  }

  .is-hidden {
    opacity: 0;
    transition: 0.3s ease-in-out;
  }
`;
