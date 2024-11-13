import { css } from 'lit';

// these styles can be imported from any component
// for an example of how to use this, check /pages/about-about.ts
export const style = css`
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 1%;
    transition: 0.3s ease-in-out;
    position: fixed;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 10;
    overflow: hidden;
  }

  .navbar-scrolled {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  }

  .navbar-scrolled h1 {
    color: theme("colors.black");
  }

  html.dark .navbar-scrolled h1 {
    color: theme("colors.white");
  }

  .navbar-scrolled .menu-icon {
    color: theme("colors.black");
  }

  html.dark .navbar-scrolled .menu-icon {
    color: theme("colors.white");
  }

  .menu-icon {
    color: theme("colors.white");
  }

  .navbar-menu-container {
    display: flex;
    align-items: center;
  }

  .menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    transform: translateX(-100%);
    gap: 10px;
    width: max-content;
    padding: 10px;
    overflow: hidden;
  }

  @media screen and (max-width: 1264px) {
    .navbar {
      padding: 0 10%;
    }
  }

  @media screen and (max-width: 1000px) {
    .navbar {
      padding: 0 5%;
    }

    .menu {
      flex-direction: column;
      transform: translate(-50%, 70px);
      top: 0;
      left: 50%;
      width: 100%;
      position: fixed;
      background-color: theme("colors.white");
      z-index: 10;
      /* bottom box shadow */
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    html.dark .menu {
      background-color: theme("colors.black");
    }

    .menu {
      color: theme("colors.black");
    }
  }
`;