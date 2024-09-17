type UseBackgroundProps = {
  navbar: Ref<Element | null>;
};

//pecifies that the composable will return two functions: changeBackground and onScroll
type UseBackgroundReturn = {
  changeBackground: () => void;
  onScroll: () => void;
};

// Declares the useBackground composable function
export const useBackground = ({
  navbar,
}: UseBackgroundProps): UseBackgroundReturn => {
  const route = useRoute();

  // This function changes the background color of the navbar based on the scroll position or route path.
  const changeBackground = (): void => {
    if (navbar.value) {
      if (document.documentElement.scrollTop > 0 || route.path !== "/") {
        navbar.value.classList.add(
          "navbar-scrolled",
          "bg-white",
          "dark:bg-black",
        );
      } else {
        navbar.value.classList.remove(
          "navbar-scrolled",
          "bg-white",
          "dark:bg-black",
        );
      }
    }
  };

  // Add a backgroud to the navbar when the user as scrolled down and is not on the main page
  const onScroll = (): void => {
    if (navbar.value && route.path === "/") {
      if (window.scrollY > 0) {
        navbar.value.classList.add(
          "navbar-scrolled",
          "bg-white",
          "dark:bg-black",
          "animate__animated",
          "animate__fadeInDown",
          "animate__faster",
        );
      } else {
        navbar.value.classList.remove(
          "navbar-scrolled",
          "bg-white",
          "dark:bg-black",
          "animate__animated",
          "animate__fadeInDown",
          "animate__faster",
        );
      }
    }
  };

  return { changeBackground, onScroll };
};
