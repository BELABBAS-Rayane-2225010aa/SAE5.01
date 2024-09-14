<script setup lang="ts">
// Define the props for the component
const props = defineProps<{
  title: string; // Title to be displayed
}>();
</script>

<template>
  <!-- Container with a blur effect -->
  <div class="blur-sm">
    <!-- Include the DefaultBackground component and hide its title -->
    <DefaultBackground :is-hide-title="true" />
  </div>
  <!-- Main content container with styling -->
  <div class="blur-bg bg-white dark:bg-black p-8 rounded-lg shadow-lg max-w-md w-full">
    <!-- Display the title passed as a prop -->
    <h2 class="text-2xl font-bold mb-6 text-center">{{ props.title }}</h2>
    <!-- Slot for additional content -->
    <slot />
  </div>
</template>

<style scoped>
/* Style for the main content container */
.blur-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>