<script setup lang="ts">
import { ref } from 'vue';
import type { Event } from "~/models/event";

const props = defineProps<{
    events: Event[]
}>();

const showPopup = ref(false);

const emit = defineEmits(['updateEventList']);

const addEvent = async (eventData: Event) => {
    await useFetchWithToast<Event>(
        `/api/event/post/${eventData.id}`,
        {
            successMessage: {
                title: "Event created",
                description: "The event has been successfully created"
            },
            errorMessage: {
                title: "Error",
                description: "Unable to create the event",
            },
        },
        {
            method: "POST",
            body: JSON.stringify(eventData),
        },
    ).then((data: Event | void) => {
        if (data) {
            console.log('Événement créé:', data);
            emit('updateEventList');
        }
        showPopup.value = false;
    });
};
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