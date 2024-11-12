import { css } from 'lit';

  // these styles can be imported from any component
  // for an example of how to use this, check /pages/about-about.ts
  export const style = css`
    .card {
        display: flex;
        flex-direction: row;
        max-height: 400px;
        gap: 20px;
        transition: 0.3s ease-in-out;
      }

      @media screen and (max-width: 1024px) {
        .card {
          max-height: fit-content;
        }
      }

      @media screen and (max-width: 768px) {
        .card {
          flex-direction: column;
          max-height: fit-content;
        }
      }

      .card-description,
      .card-description-fullwidth {
        display: flex;
        flex-direction: column;
        gap: 10px;
        transition: 0.3s ease-in-out;
      }

      .card-description {
        width: 50%;

        @media screen and (max-width: 768px) {
          width: 100%;
        }
      }

      .card-description-fullwidth {
        width: 100%;
      }

      .card-image {
        width: 50%;
        object-fit: cover;
        border-radius: 5px;
        transition: 0.3s ease-in-out;

        @media screen and (max-width: 768px) {
          width: 100%;
        }
      }
  `;