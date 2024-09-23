<script setup lang="ts">
import type { Event } from "~/models/event";

const props = defineProps<{
    events: Event[]
}>();
</script>

<template>
    <UButton class="cardButtonTechno">
        Créer un événement
    </UButton>

    <ul>
        <li v-for="(event, index) in events" :key="index">
            <AdminEventManagementEvent
                :event="event"
            />
        </li>
    </ul>
</template>

<style scoped>
</style>