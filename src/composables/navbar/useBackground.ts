export class BackgroundState {
    navbar: HTMLElement | null = null;

    constructor(navbar: HTMLElement | null) {
      this.navbar = navbar;
    }

    changeBackground() {
      if (this.navbar) {
        this.updateOpacity();
      }
    }

    onScroll() {
      if (this.navbar) {
        this.updateOpacity();
      }
    }

    updateOpacity() {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const maxScroll = 1200;
      const opacity = Math.min(scrollTop / maxScroll, 1);
      if (this.navbar) {
        this.navbar.style.backgroundColor = `rgba(20, 20, 20, ${opacity})`;
        this.navbar.style.transition = 'background-color 0.3s ease';
      }
    }
}