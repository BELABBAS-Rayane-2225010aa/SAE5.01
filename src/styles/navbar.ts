import { css } from 'lit';

// these styles can be imported from any component
// for an example of how to use this, check /pages/about-about.ts
export const style = css`
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 2%;
    transition: 0.3s ease-in-out;
    position: fixed;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: 10;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0); /* Initial transparent background */
  }

  .navbar-scrolled {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }

  h1 {
    font-size: 50px;
  }

  a{
    color: white;
    text-decoration: none;
  }

  .bg-white {
    background-color: white;
  }

  .dark .bg-black {
    background-color: black;
  }

  .navbar-scrolled h1 {
    color: black;
  }

  html.dark .navbar-scrolled h1 {
    color: white;
  }

  .navbar-scrolled .menu-icon {
    color: black;
  }

  html.dark .navbar-scrolled .menu-icon {
    color: white;
  }

  .menu-icon {
    color: white;
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

  @media screen and (max-width: 1000px) {
    .menu {
      flex-direction: column;
      transform: translate(-50%, 70px);
      top: 0;
      left: 50%;
      width: 100%;
      position: fixed;
      background-color: white;
      z-index: 10;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    html.dark .menu {
      background-color: black;
    }

    .menu {
      color: black;
    }
  }
`;