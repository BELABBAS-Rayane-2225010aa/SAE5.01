<script setup lang="ts">
// Define the props for the component with properties for image, imageAlt, title, and an optional boolean for small size
const props = defineProps<{
  image: string;
  imageAlt: string;
  title: string;
  isSmall?: boolean;
}>();
</script>

<template>
  <!-- Header element with conditional class based on isSmall prop -->
  <header :class="isSmall ? 'relative small-height' : 'relative height'">
    <!-- Render the image with the provided src and alt props -->
    <NuxtImg :src="props.image" :alt="props.imageAlt" />
    <!-- Render the title with the provided title prop -->
    <h1 class="text-white font-black text-5xl">{{ title }}</h1>
  </header>
</template>

<style scoped>
/* Define height for the header when isSmall is false */
.height {
  height: 500px;
}

/* Define height for the header when isSmall is true */
.small-height {
  height: 200px;
}

/* Style the header element */
header {
  border-radius: 25px;
  overflow: hidden;

  /* Style the image inside the header */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Style the title inside the header */
  h1 {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}
</style>