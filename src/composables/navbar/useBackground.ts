export class BackgroundState {
  // Property to store the navbar element
  navbar: HTMLElement | null = null;

  // Constructor to initialize the navbar element
  constructor(navbar: HTMLElement | null) {
    this.navbar = navbar;
  }

  // Method to change the background of the navbar
  changeBackground() {
    if (this.navbar) {
      this.updateOpacity(); // Update the opacity of the navbar
    }
  }

  // Method to handle the scroll event
  onScroll() {
    if (this.navbar) {
      this.updateOpacity(); // Update the opacity of the navbar
    }
  }

  // Method to update the opacity of the navbar based on the scroll position
  updateOpacity() {
    const scrollTop = document.documentElement.scrollTop || window.scrollY; // Get the current scroll position
    const maxScroll = 1200; // Maximum scroll value for full opacity
    const opacity = Math.min(scrollTop / maxScroll, 1); // Calculate the opacity based on the scroll position
    if (this.navbar) {
      this.navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`; // Set the background color with the calculated opacity
      this.navbar.style.transition = 'background-color 0.3s ease'; // Add a transition effect for smooth opacity change
    }
  }
}