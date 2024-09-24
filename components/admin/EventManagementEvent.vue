<script setup lang="ts">
import { ref } from 'vue';
import type { Event } from "~/models/event";

// Define the component's props using defineProps
const props = defineProps<{
    event: Event
}>();

const showPopup = ref(false);

const showConfirmationPopup = ref(false);

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
    }
    showPopup.value = false;
    });
};

const deleteEvent = () => {
  // Ajoutez ici la logique pour supprimer l'événement
  console.log('Événement supprimé:', props.event);
  showConfirmationPopup.value = false;
};
</script>

<template>
    <div class="form-container">
        <div class="flex gap-4">
            <p>{{ event?.title }}</p>
        </div>
        <div class="flex gap-3">
            <div class="flex flex-col">
                <UButton class="cardButtonTechno" @click="showPopup = true">
                    Modifier
                </UButton>
            </div>
            <div class="flex flex-col">
                <UButton class="cardButtonTechno" @click="showConfirmationPopup = true">
                    Supprimer
                </UButton>
            </div>
        </div>
    </div>

    <AdminPopUpEventModification v-if="showPopup" :event="event" @close="showPopup = false" @submit="updateEvent" />

    <AdminPopUpEventSuppression v-if="showConfirmationPopup" @confirm="deleteEvent" @cancel="showConfirmationPopup = false" />

    <!-- Divider to separate the days -->
    <UDivider
        orientation="horizontal"
        class="mt-2"
        icon="i-heroicons-calendar-days"
    />
</template>