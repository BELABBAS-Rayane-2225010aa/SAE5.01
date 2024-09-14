<script setup lang="ts">
// Define a type for the card information
export type CardInfos = {
  title: string;
  subTitle?: string;
  description: string;
  publicImage?: string;
  isReversed?: boolean;
};

// Define the props for the component, expecting an object of type CardInfos
const { cardInfos } = defineProps<{
  cardInfos: CardInfos;
}>();
</script>

<template>
  <div class="card">
    <!-- Display the image if isReversed is false and publicImage is provided -->
    <NuxtImg
      v-if="!cardInfos.isReversed && cardInfos.publicImage"
      class="card-image"
      :src="cardInfos.publicImage ?? ''"
    />

    <!-- Display the card description, adjust the class based on whether an image is provided -->
    <div
      :class="
        cardInfos.publicImage
          ? 'card-description'
          : 'card-description-fullwidth'
      "
    >
      <!-- Display the card title -->
      <h2 class="text-xl font-bold text-primary-500">{{ cardInfos.title }}</h2>

      <!-- Display the card subtitle if provided -->
      <h3 class="italic">
        {{ cardInfos.subTitle ?? "" }}
      </h3>

      <!-- Divider between subtitle and description -->
      <UDivider size="sm" />

      <!-- Display the card description -->
      <p>
        {{ cardInfos.description }}
      </p>
    </div>

    <!-- Display the image if isReversed is true and publicImage is provided -->
    <NuxtImg
      v-if="cardInfos.isReversed && cardInfos.publicImage"
      class="card-image"
      :src="cardInfos.publicImage ?? ''"
    />
  </div>
</template>

<style>
@import url("~/assets/css/card/presentation.css");
</style>