<script setup lang="ts">
// Define a type for the card navigation information
export type CardNavigationInfos = {
  title: string;
  description: string;
  path: string;
  iconUrl: string;
};

// Define the props for the component, expecting an object of type CardNavigationInfos
const { cardNavigationInfos } = defineProps<{
  cardNavigationInfos: CardNavigationInfos;
}>();

// Reactive reference to track if the card is hovered
const isHovered = ref(false);

// Function to handle mouse enter event, sets isHovered to true
const handleMouseEnter = () => {
  isHovered.value = true;
};

// Function to handle mouse leave event, sets isHovered to false
const handleMouseLeave = () => {
  isHovered.value = false;
};

// Function to handle click event, navigates to the path specified in cardNavigationInfos
const handleClick = async () => {
  await navigateTo(cardNavigationInfos.path);
};
</script>

<template>
  <div
    class="card-navigation"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <!-- Display the icon if the card is not hovered -->
    <UIcon
      v-if="!isHovered"
      :name="cardNavigationInfos.iconUrl"
      class="text-3xl animate__animated animate__fadeInDown animate__faster"
    />
    <!-- Display the title if the card is not hovered -->
    <h3
      v-if="!isHovered"
      class="font-bold text-lg animate__animated animate__fadeInDown animate__faster"
    >
      {{ cardNavigationInfos.title }}
    </h3>
    <!-- Display the description if the card is hovered -->
    <p
      v-if="isHovered"
      class="text-center text-sm animate__animated animate__fadeInUp animate__faster"
    >
      {{ cardNavigationInfos.description }}
    </p>
  </div>
</template>

<style>
@import url("~/assets/css/card/navigation.css");
</style>