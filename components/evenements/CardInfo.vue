<script setup lang="ts">
import type { Item } from "~/pages/evenements.vue";

// Define the component's props using defineProps
const { itemInfos } = defineProps<{
  itemInfos: Item;
}>();

</script>

<template>
    <!-- Display the card information for the event -->
    <div class="cardTechno">
        <div>
            <NuxtImg class="cardImageTechno" :src="itemInfos.images[0] ?? ''" />

            <div class="cardTextTechno">
            <h3 class="text-xl font-bold text-primary-500">
                {{ itemInfos.title }}
            </h3>
            </div>
        </div>

        <UButton
            class="cardButtonTechno"
            variant="link"
            :to="`/evenement/${itemInfos.id}`"
        >
            Voir plus
        </UButton>
    </div>
</template>

<style>
/* Add the CSS for the card information */
@import url("~/assets/css/technologies/cardInfo.css");
</style>