import { describe, it, expect, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useNavbar } from '@/composables/navbar/useNavbar';

describe('useNavbar', () => {
  let navbarComposable: ReturnType<typeof useNavbar>;

  beforeEach(() => {
    navbarComposable = useNavbar();
  });

  it('devrait initialiser le menu comme fermé et afficher les liens principaux', () => {
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

  it("devrait ouvrir le menu lors de l'appel à toggleMenu", () => {
    const { isMenuOpen, toggleMenu } = navbarComposable;

    toggleMenu();
    expect(isMenuOpen.value).toBe(true);

    toggleMenu();
    expect(isMenuOpen.value).toBe(false);
  });

  it("devrait afficher les sous-liens pour 'Photovoltaïque' lors de l'appel à toggleMenuWithSubLinks", () => {
    const { refLinks, toggleMenuWithSubLinks } = navbarComposable;

    toggleMenuWithSubLinks();
    expect(refLinks.value).toEqual([
      { icon: 'i-heroicons-arrow-left-circle', name: 'Retour', onClick: expect.any(Function) },
      { name: 'Informations', path: '/photovoltaique' },
      { name: 'Visualisation', path: '/photovoltaique/visualisation' },
    ]);
  });

  it('devrait fermer le menu lors de l\'appel à resetMenu', () => {
    const { isMenuOpen, resetMenu, toggleMenu } = navbarComposable;

    toggleMenu(); // ouvre le menu
    expect(isMenuOpen.value).toBe(true);

    resetMenu(); // réinitialise et ferme le menu
    expect(isMenuOpen.value).toBe(false);
  });

  it('devrait retourner aux liens principaux lorsque "Retour" est cliqué dans les sous-liens', () => {
    const { refLinks, toggleMenuWithSubLinks } = navbarComposable;

    // Activer les sous-liens
    toggleMenuWithSubLinks();
    expect(refLinks.value[0].name).toBe('Retour');

    // Exécuter l'action onClick de "Retour"
    const retourLink = refLinks.value[0];
    retourLink.onClick?.();

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
