import { css } from 'lit';

  // these styles can be imported from any component
  // for an example of how to use this, check /pages/about-about.ts
  export const style = css`
    .parteners__container {
        display: flex;
        gap: 20px;
        padding-top: 80px;
    }

    @media screen and (max-width: 768px) {
        .parteners__container {
        flex-direction: column;
        align-items: center;
        }
    }

    .parteners__description {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .parteners__images {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        width: 70%;
    }

    .image img {
        height: 100px;
        width: 100px;
        object-fit: contain;
    }
  `;