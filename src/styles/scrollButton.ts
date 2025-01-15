import { css } from 'lit';

  // these styles can be imported from any component
  // for an example of how to use this, check /pages/about-about.ts
  export const style = css`
    .scroll-button {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, -100%);
      animation: bounce 2s infinite ease-in-out;
    }

    .scroll-button sl-icon{
      /*width: 50px;
      height: 50px;*/
    }

    @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translate(-50%, -100%);
    }
    40% {
      transform: translate(-50%, -120%);
    }
    60% {
      transform: translate(-50%, -110%);
    }
  }
  `;