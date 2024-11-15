import { describe, it, expect, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useNavbar } from '@/composables/navbar/useNavbar';

describe('useNavbar', () => {
  let navbarComposable: ReturnType<typeof useNavbar>;

  beforeEach(() => {
    navbarComposable = useNavbar();
  });

  it('should initialize the menu as closed and display the main links', () => {
    const { isMenuOpen, refLinks } = navbarComposable;

    expect(isMenuOpen.value).toBe(false);
    expect(refLinks.value).toEqual([
      { name: 'Technologies', path: '/technologies' },
      { name: 'Photovoltaïque', path: '/photovoltaique' },
      { name: 'Données météo', path: '/meteo' },
      { name: 'Epicerie solidaire', path: '/epicerie-solidaire' },
      { name: 'Contact', path: '/contact' },
      { name: 'Evenements', path: '/evenements' },
    ]);
  });

  it("should toggle the menu open when calling toggleMenu", () => {
    const { isMenuOpen, toggleMenu } = navbarComposable;

    toggleMenu();
    expect(isMenuOpen.value).toBe(true);

    toggleMenu();
    expect(isMenuOpen.value).toBe(false);
  });

  it("should display the sub-links for 'Photovoltaïque' when calling toggleMenuWithSubLinks", () => {
    const { refLinks, toggleMenuWithSubLinks } = navbarComposable;

    toggleMenuWithSubLinks();
    expect(refLinks.value).toEqual([
      { icon: 'i-heroicons-arrow-left-circle', name: 'Retour', onClick: expect.any(Function) },
      { name: 'Informations', path: '/photovoltaique' },
      { name: 'Visualisation', path: '/photovoltaique/visualisation' },
    ]);
  });

  it('should close the menu when calling resetMenu', () => {
    const { isMenuOpen, resetMenu, toggleMenu } = navbarComposable;

    toggleMenu(); // open the menu
    expect(isMenuOpen.value).toBe(true);

    resetMenu(); // reset and close the menu
    expect(isMenuOpen.value).toBe(false);
  });

  it('should return to the main links when "Back" is clicked in the sub-links', () => {
    const { refLinks, toggleMenuWithSubLinks } = navbarComposable;

    // Activate the sub-links
    toggleMenuWithSubLinks();
    expect(refLinks.value[0].name).toBe('Retour');

    // Execute the onClick action of "Back"
    const backLink = refLinks.value[0];
    backLink.onClick?.();

    expect(refLinks.value).toEqual([
      { name: 'Technologies', path: '/technologies' },
      { name: 'Photovoltaïque', path: '/photovoltaique' },
      { name: 'Données météo', path: '/meteo' },
      { name: 'Epicerie solidaire', path: '/epicerie-solidaire' },
      { name: 'Contact', path: '/contact' },
      { name: 'Evenements', path: '/evenements' },
    ]);
  });
});
