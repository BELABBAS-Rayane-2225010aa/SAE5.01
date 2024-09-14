<script setup lang="ts">
// Import necessary functions and hooks from Vue and other libraries
const route = useRoute(); // Get the current route
const navbar = ref<Element | null>(null); // Reference to the navbar element

const auth = useAuth(); // Authentication hook
const toast = useToast(); // Toast notification hook

// Destructure necessary functions and state from the useNavbar hook
const { isMenuOpen, refLinks, resetMenu, toggleMenu, toggleMenuWithSubLinks } = useNavbar();

// Destructure necessary functions from the useBackground hook
const { changeBackground, onScroll } = useBackground({ navbar });

// Lifecycle hook to run when the component is mounted
onMounted(() => {
  navbar.value = document.querySelector(".navbar"); // Get the navbar element

  changeBackground(); // Change the background based on the current state
  window.addEventListener("scroll", onScroll); // Add scroll event listener
});

// Watch for changes in the route path and update the background and menu state
watch(
    () => route.path,
    () => {
      changeBackground(); // Change the background based on the new route
      resetMenu(); // Reset the menu state
    },
);

// Function to handle user sign out
const onSignOut = (): void => {
  auth
      .signOut({ callbackUrl: "/" }) // Sign out the user and redirect to the home page
      .then(() => {
        toast.add({
          title: "Déconnexion", // Title of the toast notification
          description: "Vous avez été déconnecté avec succès", // Description of the toast notification
        });
      })
      .catch((error) => {
        toast.add({
          title: "Déconnexion", // Title of the toast notification
          description: `Une erreur est survenue lors de la déconnexion ${error}`, // Error message in the toast notification
          color: "red", // Color of the toast notification
        });
      });
};
</script>

<template>
  <!-- Navbar container -->
  <nav class="navbar">
    <!-- Navbar title with a link to the home page -->
    <h1 class="text-xl md:text-3xl text-white font-bold animate__animated animate__fadeInLeft animate__fast">
      <NuxtLink to="/">Magasin Connecté 4.0</NuxtLink>
    </h1>

    <!-- Navbar menu container -->
    <div class="navbar-menu-container">
      <!-- Menu items, conditionally rendered based on isMenuOpen -->
      <ul class="menu" v-if="isMenuOpen">
        <li
            class="animate__animated animate__fadeInDown animate__faster"
            v-for="refLink in refLinks"
            :key="refLink.name"
        >
          <!-- Render a button for each menu item, with different behavior based on the item name -->
          <UButton
              v-if="refLink.name !== 'Photovoltaïque' && refLink.name !== 'Retour'"
              :to="refLink.path"
              variant="link"
              size="xl"
          >{{ refLink.name }}</UButton>
          <UButton
              v-else-if="refLink.name === 'Retour'"
              :icon="refLink.icon"
              variant="link"
              size="xl"
              @click="refLink.onClick"
          />
          <UButton
              v-else
              variant="link"
              size="xl"
              @click="toggleMenuWithSubLinks"
          >{{ refLink.name }}</UButton>
        </li>
      </ul>

      <!-- Menu toggle button, conditionally rendered based on isMenuOpen -->
      <UButton
          icon="i-heroicons-bars-3-16-solid"
          size="md"
          v-if="!isMenuOpen"
          class="menu-icon text-3xl cursor-pointer animate__animated animate__flipInX animate__fast"
          @click="toggleMenu"
          variant="link"
      />
      <UButton
          icon="i-heroicons-x-mark-16-solid"
          size="md"
          v-if="isMenuOpen"
          class="menu-icon text-3xl cursor-pointer animate__animated animate__flipInX animate__fast"
          @click="toggleMenu"
          variant="link"
      />

      <!-- Administration link with a tooltip -->
      <UTooltip text="Espace administration">
        <UButton
            icon="i-heroicons-user-16-solid"
            size="md"
            class="menu-icon"
            to="/administration"
            variant="link"
        />
      </UTooltip>

      <!-- Sign out button with a tooltip, conditionally rendered based on authentication status -->
      <UTooltip text="Déconnexion" v-if="auth.status.value === 'authenticated'">
        <UButton
            v-if="auth.status.value === 'authenticated'"
            icon="i-heroicons-arrow-right-start-on-rectangle-16-solid"
            size="md"
            class="menu-icon"
            variant="link"
            @click="onSignOut"
        />
      </UTooltip>
    </div>
  </nav>
</template>

<style scoped>
@import url("~/assets/css/navbar.css"); /* Import external CSS for the navbar styling */
</style>