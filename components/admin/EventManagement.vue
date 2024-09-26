<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { Event } from "~/models/event";

const props = defineProps<{
    events: Event[]
}>();

const showPopup = ref(false);
const showConfirmationPopup = ref(false);
const isUpdateAction = ref(false);
const selectedEvent = ref<Event | null>(null);

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
            emit('updateEventList');
        }
        showPopup.value = false;
    });
};

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
        showPopup.value = false;
    });
};

const deleteEvent = async () => {
    if (!selectedEvent.value) return;

    await useFetchWithToast<Event>(
        `/api/event/delete/${selectedEvent.value.id}`,
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
            body: JSON.stringify(selectedEvent.value),
        },
    ).then((data: Event | void) => {
        if (data) {
            console.log('Événement supprimé:', data);
            emit('updateEventList');
        }
        showConfirmationPopup.value = false;
    });
};

const handleShowUpdatePopup = (event: Event) => {
    selectedEvent.value = event;
    isUpdateAction.value = true;
    showPopup.value = true;
};

const handleShowConfirmationPopup = (event: Event) => {
    selectedEvent.value = event;
    showConfirmationPopup.value = true;
};

const handleShowAddPopup = () => {
    selectedEvent.value = null;
    isUpdateAction.value = false;
    showPopup.value = true;
};
</script>

<template>
    <div>
        <UButton class="cardButtonTechno" @click="handleShowAddPopup">
            Créer un événement
        </UButton>

        <AdminPopUpEvent 
            v-if="showPopup" 
            @submit="isUpdateAction ? updateEvent($event) : addEvent($event)"
            @close="showPopup = false"
            :event="selectedEvent || {} as Event"
        />
        
        <AdminPopUpEventSuppression v-if="showConfirmationPopup" @confirm="deleteEvent" @cancel="showConfirmationPopup = false" />

        <div class="form-container">
            <table class="event-table">
                <thead>
                    <tr>
                        <th class="title-column">Title</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="event in events" :key="event.id">
                        <AdminEventManagementEvent :event="event" @showPopUpEvent="handleShowUpdatePopup" @showPopUpEventSuppression="handleShowConfirmationPopup" />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
@import url("~/assets/css/admin/eventManagement.css");
</style>