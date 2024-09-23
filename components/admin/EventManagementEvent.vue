<script setup lang="ts">
import type { Event } from "~/models/event";

// Define the component's props using defineProps
// Use props instead of destructuring because we need to watch the week and day props inside the component
const props = defineProps<{
    event: Event
}>();

</script>

<template>
    <div class="form-container">
        <div class="flex gap-4">
            <p>{{ event?.title }}</p>
        </div>
        <div class="flex gap-3">
            <div class="flex flex-col">
                <UButton class="cardButtonTechno">
                    Modifier
                </UButton>
            </div>
            <div class="flex flex-col">
                <UButton class="cardButtonTechno">
                    Supprimer
                </UButton>
            </div>
        </div>
    </div>

    <!-- Divider to separate the days -->
    <UDivider
        orientation="horizontal"
        class="mt-2"
        icon="i-heroicons-calendar-days"
    />
</template>