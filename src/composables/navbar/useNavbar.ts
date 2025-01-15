// Define the Link type with optional properties for path, icon, and onClick handler
export type Link = {
    name: string;
    path?: string;
    icon?: string;
    onClick?: () => void;
  };

  // Class to manage the state of the navbar
  export class NavbarState {
    // Property to track if the menu is open
    isMenuOpen = false;
    // Property to store the reference links
    refLinks: Link[] = [];
    // Array to store observer functions
    private observers: (() => void)[] = [];

    // Define the main links for the navbar
    links: Link[] = [
      { name: 'Home', path: '/' },
      { name: 'Technologies', path: '/technologies' },
      { name: 'Photovoltaïque', path: '/photovoltaique' },
      { name: 'Epicerie solidaire', path: '/epicerie-solidaire' },
      { name: 'Météo', path: '/meteo' },
      { name: 'Contact', path: '/contact' },
      { name: 'Evenements', path: '/evenements' },
      { icon: 'arrow-left', name: 'Retour', onClick: () => this.toggleMenu() }
    ];

    // Define the sub-links for the navbar
    subLinks: Link[] = [
      { icon: 'arrow-left', name: 'Retour', onClick: () => this.toggleBackMenuWithSubLinks() },
      { name: 'Informations', path: '/photovoltaique' },
      { name: 'Visualisation', path: '/visualisation' }
    ];

    // Constructor to initialize the reference links and bind methods
    constructor() {
      this.refLinks = this.links;
      this.toggleMenu = this.toggleMenu.bind(this);
      this.toggleMenuWithSubLinks = this.toggleMenuWithSubLinks.bind(this);
      this.toggleBackMenuWithSubLinks = this.toggleBackMenuWithSubLinks.bind(this);
    }

    // Method to toggle the main menu
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      this.refLinks = this.isMenuOpen ? this.links : [];
      this.notifyObservers(); // Notify observers of the state change
    }

    // Method to toggle the menu with sub-links
    toggleMenuWithSubLinks() {
      this.refLinks = this.subLinks;
      this.notifyObservers(); // Notify observers of the state change
    }

    // Method to toggle back to the main menu from sub-links
    toggleBackMenuWithSubLinks() {
      this.refLinks = this.links;
      this.notifyObservers(); // Notify observers of the state change
    }

    // Method to add an observer function
    addObserver(observer: () => void) {
      this.observers.push(observer);
    }

    // Method to notify all observer functions of a state change
    private notifyObservers() {
      this.observers.forEach(observer => observer());
    }
  }