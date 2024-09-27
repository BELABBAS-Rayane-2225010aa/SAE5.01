<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { Event } from "~/models/event";

// Define the component's props using defineProps
const props = defineProps<{
    events: Event[]
}>();

const showPopup = ref(false);   // Show the popup to add or update an event
const showConfirmationPopup = ref(false);   // Show the popup to confirm the deletion of an event
const isUpdateAction = ref(false);  // Define if the action is an update or an add
const selectedEvent = ref<Event | null>(null);  // The selected event to update or delete

const emit = defineEmits(['updateEventList']);  // Emit the event to update the event list

// add the event to the database using the `/api/event/post/$(eventData.id)` route
// accept an Event object as a parameter
// use the useFetchWithToast function to handle the fetch request and display a toast message
// emit the 'updateEventList' event to update the event list
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

// update the event in the database using the `/api/event/put/$(updatedEvent.id)` route
// accept an Event object as a parameter
// use the useFetchWithToast function to handle the fetch request and display a toast message
// emit the 'updateEventList' event to update the event list
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

// delete the event in the database using the `/api/event/delete/$(selectedEvent.value.id)` route
// use the useFetchWithToast function to handle the fetch request and display a toast message
// emit the 'updateEventList' event to update the event list
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

// show the popup to update the event
const handleShowUpdatePopup = (event: Event) => {
    selectedEvent.value = event;    // Set the selected event
    isUpdateAction.value = true;    // Set the action to update
    showPopup.value = true;        // Show the popup
};

// show the popup to confirm the deletion of the event
const handleShowConfirmationPopup = (event: Event) => {
    selectedEvent.value = event;    // Set the selected event
    showConfirmationPopup.value = true;   // Show the confirmation popup
};

// show the popup to add a new event
const handleShowAddPopup = () => {
    selectedEvent.value = null;   // Reset the selected event
    isUpdateAction.value = false;   // Set the action to add
    showPopup.value = true;   // Show the popup
};
</script>

<template>
    <div>
        <!-- Button to create an Event -->
        <UButton @click="handleShowAddPopup">
            Créer un événement
        </UButton>

        <!-- Popup to add or update an Event -->
        <AdminPopUpEvent 
            v-if="showPopup" 
            @submit="isUpdateAction ? updateEvent($event) : addEvent($event)"
            @close="showPopup = false"
            :event="selectedEvent || {} as Event"
        />
        
        <!-- Popup to confirm the deletion of an Event -->
        <AdminPopUpEventSuppression v-if="showConfirmationPopup" @confirm="deleteEvent" @cancel="showConfirmationPopup = false" />

        <!-- Table to display the list of Events -->
        <div class="tab-container">
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
                        <!-- Display the Event -->
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