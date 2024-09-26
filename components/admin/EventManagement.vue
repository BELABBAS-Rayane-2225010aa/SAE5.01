<script setup lang="ts">
import { ref } from 'vue';
import type { Event } from "~/models/event";


// Define the component's props using defineProps
const props = defineProps<{
    events: Event[]
}>();

const showPopup = ref(false);   // Show the popup to create a new event

const emit = defineEmits(['updateEventList']);  // Emit the event to update the event list

// Add an event to the database using the `/api/event/post/:id` endpoint and update the event list
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
</script>

<template>
    <!-- Display a button to create a new event -->
    <UButton class="cardButtonTechno" @click="showPopup = true">
        Créer un événement
    </UButton>

    <!-- Display the popup to create a new event -->
    <AdminPopUpEventCreation v-if="showPopup" :event="{} as Event" @close="showPopup = false" @submit="addEvent" />

    <!-- Display the list of events -->
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
                    <AdminEventManagementEvent :event="event" @updateEventList="emit('updateEventList')" />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.form-container {
    margin-top: 20px;
    overflow-x: auto;
}

.event-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.event-table th,
.event-table td {
  padding: 8px;
  text-align: left;
}

.event-table th {
  background-color: #555555;
  font-weight: bold;
}

.event-table th:not(.title-column) {
    border-left: 1px solid #e2e8f0;
}

.title-column {
  width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>