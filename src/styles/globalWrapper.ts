import { css } from 'lit';

  // these styles can be imported from any component
  // for an example of how to use this, check /pages/about-about.ts
  export const style = css`
    .global-wrapper {
    margin: 110px 15%;
    transition: 0.3s ease-in-out;
    }

    .global-wrapper.fullscreen {
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 100vh;
    }

    @media screen and (max-width: 1264px) {
    .global-wrapper {
        margin: 110px 10%;
    }

    .global-wrapper.fullscreen {
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 100vh;
    }
    }

    @media screen and (max-width: 1000px) {
    .global-wrapper {
        margin: 110px 5%;
    }

    .global-wrapper.fullscreen {
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 100vh;
    }
    }
  `;