import { css } from 'lit';

  // these styles can be imported from any component
  // for an example of how to use this, check /pages/about-about.ts
  export const style = css`
.shop {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }

  @media screen and (max-width: 768px) {
   .shop__tabs {
     flex-wrap: wrap;
   }
  }
  `;