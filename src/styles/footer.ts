import { css } from 'lit';

  // these styles can be imported from any component
  // for an example of how to use this, check /pages/about-about.ts
  export const style = css`
    .footer {
    width: 100%;
    box-shadow: 0 -10px 10px rgba(0, 0, 0, 0.1);
    padding: 0 15%;
    box-sizing: border-box;
    overflow: hidden;

    .container {
        margin-left: auto;
        margin-right: auto;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        gap: 3em;

        .logo {
        /* taille du logo amu */
        width: 300px;
        max-width: 100%;
        height: auto;
        }

        .logo img {
            /* l'image s'adapte à la taille de la div logo*/
            width: 100%;
            height: auto;
        }

        .footer-menu {
        column-count: 2;
        margin: 0;
        padding: 0;

        li {
            list-style: none;
            display: block;
        }
        }
    }
    }

    @media screen and (max-width: 1264px) {
    .footer {
        padding: 0 10%;
    }
    }

    @media screen and (max-width: 1000px) {
    .footer {
        padding: 0 5%;
    }
    }
  `;