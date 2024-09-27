<script setup lang="ts">
import type { Item } from "~/pages/evenements.vue";

// Define the component's props using defineProps
const { itemInfos } = defineProps<{
  itemInfos: Item;
}>();

</script>

<template>
    <!-- Display the card information for the event -->
    <NuxtLink :to="`/evenement/${itemInfos.id}`" class="cardEvent">
        <div>
            <!-- Display the first image -->
            <NuxtImg class="cardImageEvent" :src="itemInfos.images[0] ?? ''" />

            <div class="cardTextEvent">
                <h3 class="text-xl font-bold text-primary-500">
                    {{ itemInfos.title }}
                </h3>
            </div>
        </div>
        <UButton
            class="cardButtonEvent"
            variant="link"
            :to="`/evenement/${itemInfos.id}`"
        >
            Voir plus
        </UButton>
    </NuxtLink>
</template>

<style>
@import url("~/assets/css/evenement/cardInfo.css");
</style>