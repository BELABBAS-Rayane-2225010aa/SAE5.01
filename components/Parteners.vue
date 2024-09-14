<script setup lang="ts">
// Define a constant array of strings representing the image links for the partners
const PARTENERS_IMAGES_LINK: string[] = [
  "parteners/ikea.svg.webp",
  "parteners/lucibel.webp",
  "parteners/murati.webp",
  "parteners/stid.webp",
  "parteners/auchan.webp",
  "parteners/connectwave.webp",
  "parteners/insiteo.webp",
  "parteners/dracula.webp",
  "parteners/lopcommerce.webp",
  "parteners/eurofins.webp",
] as const;
</script>

<template>
  <!-- Container for the partners section -->
  <div class="parteners__container">
    <!-- Description section for the partners -->
    <div class="parteners__description">
      <!-- Title for the partners section -->
      <h2 class="text-xl font-bold text-primary-500 text-left md:text-right">
        Nos partenaires
      </h2>
      <!-- Subtitle for the partners section -->
      <h3 class="italic text-left md:text-right">
        lorem ipsum lorem ipsum lorem
      </h3>
      <!-- Divider for the description section, visible on medium and larger screens -->
      <UDivider size="sm" class="hidden md:flex" />
      <!-- Paragraph describing the partners -->
      <p class="text-left md:text-right">
        lorem ipsum lorem ipum lorem ipsumlorem ipsum lorem ipsum lorem ipsum
        lorem ipsumlorem ipsum
      </p>
    </div>

    <!-- Vertical divider, visible on medium and larger screens -->
    <UDivider
        class="hidden md:flex"
        size="sm"
        orientation="vertical"
        icon="i-heroicons-chevron-right-16-solid"
    />

    <!-- Horizontal divider, visible on small screens -->
    <UDivider
        class="md:hidden"
        size="sm"
        orientation="horizontal"
        icon="i-heroicons-chevron-down-16-solid"
    />

    <!-- Container for the partner images -->
    <div class="parteners__images">
      <!-- Loop through the PARTENERS_IMAGES_LINK array and render each image -->
      <div class="image" v-for="(image, index) in PARTENERS_IMAGES_LINK">
        <NuxtImg
            :key="index"
        :src="image"
        :alt="`logo ${image.split('.')[0]}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("~/assets/css/parteners.css"); /* Import external CSS for the partners styling */
</style>