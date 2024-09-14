<script setup lang="ts">
// Define the props for the component with a required string for the title text
const { text } = defineProps<{
  text: string;
}>();
</script>

<template>
  <!-- Render the title with the provided text prop -->
  <h1 class="text-4xl text-primary font-bold">{{ text }}</h1>
</template>

<style scoped>
/* Style the h1 element to be centered and padded */
h1 {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>