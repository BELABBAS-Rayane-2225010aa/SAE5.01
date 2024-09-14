<script setup lang="ts">
// Define the props for the component with an optional boolean to hide the title
const props = defineProps<{
  isHideTitle?: boolean;
}>();
</script>

<template>
  <!-- Main background container -->
  <div class="background">
    <!-- Conditionally render the title based on the isHideTitle prop -->
    <h1 v-if="!isHideTitle" class="text-white text-4xl font-bold text-center">
      Bienvenue dans le <br />
      magasin connecté 4.0
    </h1>
  </div>
</template>

<style>
/* Import external CSS for the background styling */
@import url("~/assets/css/defaultBackground.css");
</style>