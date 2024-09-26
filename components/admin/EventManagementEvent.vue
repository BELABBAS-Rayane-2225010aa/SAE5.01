<script setup lang="ts">
import { ref } from 'vue';
import type { Event } from "~/models/event";

// Define the component's props using defineProps
const props = defineProps<{
    event: Event
}>();

const emit = defineEmits(['updateEventList']);  // Emit the event to update the event list

const showUpdatePopup = ref(false);   // Show the popup to update the event
const showConfirmationPopup = ref(false);   // Show the confirmation popup to delete the event

// Update an event in the database using the `/api/event/put/:id` endpoint and update the event list
const updateEvent = async (updatedEvent: Event) => {
    await useFetchWithToast<Event>(
        `/api/event/put/${updatedEvent.id}`,
        {
            successMessage: {
                title: "Event updated",
                description: "The event has been successfully updated"
            },
            errorMessage: {
                title: "Error",
                description: "Unable to update the event",
            },
        },
        {
            method: "PUT",
            body: JSON.stringify(updatedEvent),
        },
    ).then((data: Event | void) => {
        if (data) {
            console.log('Événement mis à jour:', data);
            emit('updateEventList');
        }
        showUpdatePopup.value = false;
    });
};

// Delete an event in the database using the `/api/event/delete/:id` endpoint and update the event list
const deleteEvent = async () => {
    await useFetchWithToast<Event>(
        `/api/event/delete/${props.event.id}`,
        {
            successMessage: {
                title: "Event deleted",
                description: "The event has been successfully deleted"
            },
            errorMessage: {
                title: "Error",
                description: "Unable to delete the event",
            },
        },
        {
            method: "DELETE",
            body: JSON.stringify(props.event),
        },
    ).then((data: Event | void) => {
        if (data) {
            console.log('Événement supprimé:', data);
            emit('updateEventList');
        }
        showConfirmationPopup.value = false;
    });
};
</script>

<template>
    <td class="title">{{ props.event.title }}</td>
    <td>{{ props.event.date }}</td>
    <td>{{ props.event.location }}</td>
    <td>
      <div class="flex gap-3">
        <UButton class="cardButtonTechno" @click="showUpdatePopup = true">
          Modifier
        </UButton>
        <UButton class="cardButtonTechno" @click="showConfirmationPopup = true">
          Supprimer
        </UButton>
      </div>
    </td>
  
    <!-- Display the popup to update the event -->
    <AdminPopUpEventModification v-if="showUpdatePopup" :event="props.event" @close="showUpdatePopup = false" @submit="updateEvent" />
    
    <!-- Display the confirmation popup to delete the event -->
    <AdminPopUpEventSuppression v-if="showConfirmationPopup" @confirm="deleteEvent" @cancel="showConfirmationPopup = false" />
  </template>
  
<style scoped>
@import url("~/assets/css/admin/eventManagementEvent.css");
</style>