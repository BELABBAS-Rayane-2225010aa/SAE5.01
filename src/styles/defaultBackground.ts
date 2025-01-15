import { css } from 'lit';

// these styles can be imported from any component
// for an example of how to use this, check /pages/about-about.ts
export const style = css`
  .background {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url("/assets/images/background.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
  }

  .background h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    z-index: 1;
    animation: moveUpDown 5s ease-in-out infinite;
    color: white;
  }

  .background h1::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
    border-radius: 10px;
  }

  @keyframes moveUpDown {
    0%,
    100% {
      transform: translate(-50%, -50%);
    }
    50% {
      transform: translate(-50%, calc(-50% + 20px));
    }
  }
`;