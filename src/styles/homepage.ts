import { css } from 'lit';

  // these styles can be imported from any component
  // for an example of how to use this, check /pages/about-about.ts
  export const style = css`
.card-navigation-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    transition: 0.3s ease-in-out;
  }

  .card-default-container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 80px 0;
  }

  .content {
    margin-top: 100vh;
  }
  `;