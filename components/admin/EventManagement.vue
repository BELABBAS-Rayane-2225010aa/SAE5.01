<script setup lang="ts">
import { ref } from 'vue';
import type { Event } from "~/models/event";

const props = defineProps<{
    events: Event[]
}>();

const showPopup = ref(false);

const addEvent = (eventData: any) => {
  // Ajoutez ici la logique pour ajouter l'événement
  console.log('Nouvel événement ajouté:', eventData);
  showPopup.value = false;
};

const emit = defineEmits(['updateEventList']);
</script>

<template>
    <UButton class="cardButtonTechno" @click="showPopup = true">
        Créer un événement
    </UButton>

    <AdminPopUpEventCreation v-if="showPopup" @close="showPopup = false" @submit="addEvent" />

    <ul>
        <li v-for="(event, index) in events" :key="index">
            <AdminEventManagementEvent
                :event="event"
                @updateEventList="emit('updateEventList');"
            />
        </li>
    </ul>
</template>

<style scoped>
</style>