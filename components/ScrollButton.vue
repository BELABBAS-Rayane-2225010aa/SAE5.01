<script setup lang="ts">
// Define the props for the component with a hash string
const { hash } = defineProps<{
  hash: string;
}>();
</script>

<template>
  <!-- Container for the scroll button -->
  <div class="scroll-button">
    <!-- Button that scrolls to the element with the specified hash -->
    <UButton
        class="animate-bounce hover:animate-none rounded-full"
    :to="{ hash: hash }"
    icon="i-heroicons-arrow-down-16-solid"
    size="xl"  >

    </UButton>
  </div>
</template>

<style>
@import url("~/assets/css/scrollButton.css"); /* Import external CSS for the scroll button styling */
</style>