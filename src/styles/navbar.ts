import { css } from 'lit';

// these styles can be imported from any component
// for an example of how to use this, check /pages/about-about.ts
export const style = css`
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 8%;
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
    background: transparent;
    border: none;
  }

  .menu-icon sl-icon {
    font-size: 2rem;
    margin: 1rem;
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
    gap: 25px;
    width: max-content;
    padding: 20px;
    overflow: hidden;
    list-style: none;
  }

  .menu sl-icon{
    font-size: 2rem;
    color: white;
  }

  .link-button{
    font-size: 1.1rem;
    color: #10d2f5;
    border: none;
    background: transparent;
    text-decoration: none;
  }

  .title{
    font-size: 2rem;
    color: white;
    text-decoration: none;
  }

  .link-button:hover {
    color: #1095ca;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 0.1rem;
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