<script setup lang="ts">
// Define the props for the component, expecting an optional title, a value, and a unit
const props = defineProps<{
  title?: string;
  value: number;
  unit: string;
}>();
</script>

<template>
  <div class="card-value-w-unit rounded-3xl">
    <!-- Display the title if it is provided -->
    <p v-if="title" class="text-white">{{ title }}</p>
    <!-- Display the value in bold and large font -->
    <p class="font-bold text-white text-4xl">{{ value }}</p>
    <!-- Display the unit in bold and slightly smaller font -->
    <p class="font-bold text-gray-500 text-2xl">{{ unit }}</p>
  </div>
</template>

<style scoped>
/* Styling for the card container */
.card-value-w-unit {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: theme('colors.primary.800');
  width: 250px;
  height: 250px;
  padding: 10px;
}
</style>