import { css } from 'lit';

  // these styles can be imported from any component
  // for an example of how to use this, check /pages/about-about.ts
  export const style = css`
.shop__images {
    display: flex;
    gap: 1px;
  }

  @media screen and (max-width: 768px) {
    .shop__images {
      flex-wrap: wrap;
    }
  }

  .shop__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  `;