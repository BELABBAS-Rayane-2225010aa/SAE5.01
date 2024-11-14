export class BackgroundState {
    navbar: HTMLElement | null = null;

    constructor(navbar: HTMLElement | null) {
      this.navbar = navbar;
      console.log('Navbar element:', this.navbar);
    }

    changeBackground() {
      console.log('changeBackground called');
      if (this.navbar) {
        this.updateOpacity();
      }
    }

    onScroll() {
      console.log('onScroll called');
      if (this.navbar) {
        this.updateOpacity();
      }
    }

    updateOpacity() {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      console.log('Scroll position:', scrollTop);
      const maxScroll = 1200;
      const opacity = Math.min(scrollTop / maxScroll, 1);
      console.log('Calculated opacity:', opacity);
      if (this.navbar) {
        this.navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        this.navbar.style.transition = 'background-color 0.3s ease';
      }
    }
}