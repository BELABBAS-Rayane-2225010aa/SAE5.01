import { css } from 'lit';

  // these styles can be imported from any component
  // for an example of how to use this, check /pages/about-about.ts
  export const style = css`
    .card-navigation {
        position: relative;
        overflow: hidden;
        width: 200px;
        height: 200px;
        border: 1px solid theme("colors.gray.500");
        border-radius: 4px;
        gap: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: 0.3s ease-in-out;
        cursor: pointer;
      }
  `;