<script setup lang="ts">
// Define the props for the component with an optional boolean to enable fullscreen mode
const { withFullscreen } = defineProps<{ withFullscreen?: boolean }>();
</script>

<template>
  <div
      :class="{
      'global-wrapper': true, // Always apply the 'global-wrapper' class
      fullscreen: withFullscreen, // Conditionally apply the 'fullscreen' class based on the withFullscreen prop
    }"
  >
    <slot></slot>
  </div>
</template>

<style>
/* Import external CSS for the global wrapper styling */
@import url("~/assets/css/globalWrapper.css");
</style>