export type Link = {
    name: string;
    path?: string;
    icon?: string;
    onClick?: () => void;
  };

export class NavbarState {
    isMenuOpen = false;
    refLinks: Link[] = [];
    private observers: (() => void)[] = [];

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

    subLinks: Link[] = [
        { icon: 'arrow-left', name: 'Retour', onClick: () => this.toggleBackMenuWithSubLinks() },
        { name: 'Informations', path: '/photovoltaique' },
        { name: 'Visualisation', path: '/visualisation' }
    ];

    constructor() {
        this.refLinks = this.links;
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleMenuWithSubLinks = this.toggleMenuWithSubLinks.bind(this);
        this.toggleBackMenuWithSubLinks = this.toggleBackMenuWithSubLinks.bind(this);
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.refLinks = this.isMenuOpen ? this.links : [];
        this.notifyObservers();
    }

    toggleMenuWithSubLinks() {
        this.refLinks = this.subLinks;
        this.notifyObservers();
    }

    toggleBackMenuWithSubLinks() {
        this.refLinks = this.links;
        this.notifyObservers();
    }

    addObserver(observer: () => void) {
        this.observers.push(observer);
    }

    private notifyObservers() {
        this.observers.forEach(observer => observer());
    }
}