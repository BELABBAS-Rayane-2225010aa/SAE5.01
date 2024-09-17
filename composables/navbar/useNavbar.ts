// defines Link
type Link = {
  name: string;
  path?: string;
  icon?: string;
  onClick?: () => void;
};

// defines UseNavbarReturn
type UseNavbarReturn = {
  isMenuOpen: Ref<boolean>;
  refLinks: Ref<Link[]>;
  toggleMenu: () => void;
  toggleMenuWithSubLinks: () => void;
  resetMenu: () => void;
};

//
export const useNavbar = (): UseNavbarReturn => {
  const isMenuOpen = ref<boolean>(false);

  // Navbar links
  const links: Link[] = [
    {
      name: "Technologies",
      path: "/technologies",
    },
    {
      name: "Photovoltaïque",
      path: "/photovoltaique",
    },
    {
      name: "Epicerie solidaire",
      path: "/epicerie-solidaire",
    },
    {
      name: "Contact",
      path: "/contact",
    }
  ];

  const refLinks = ref<Link[]>(links);

  // Sublinks for "Photovoltaique"
  const subLinks: Link[] = [
    {
      icon: "i-heroicons-arrow-left-circle",
      name: "Retour",
      onClick: () => (refLinks.value = links),
    },
    {
      name: "Informations",
      path: "/photovoltaique",
    },
    {
      name: "Visualisation",
      path: "/photovoltaique/visualisation",
    },
  ];

  // Opens the menu if it's closed / closes it if it's open
  const toggleMenu = (): void => {
    isMenuOpen.value = !isMenuOpen.value;
    refLinks.value = links;
  };

  // Display the subLinks instead of the main links
  const toggleMenuWithSubLinks = (): void => {
    refLinks.value = subLinks;
  };

  // Close the menu
  const resetMenu = (): void => {
    isMenuOpen.value = false;
  };

  return {
    isMenuOpen,
    refLinks,
    toggleMenu,
    toggleMenuWithSubLinks,
    resetMenu,
  };
};
