<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';
import type { Event } from "~/models/event";

const props = defineProps<{
    events: Event[]
}>();

const showPopup = ref(false);
const showConfirmationPopup = ref(false);
const isUpdateAction = ref(false);
const selectedEvent = ref<Event | null>(null);
const searchQuery = ref('');
const filteredEvents = ref<Event[]>([]);
const visibleEventsCount = ref(10);

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

const sortEventsByDate = (events: Event[]) => {
    return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const searchEvent = () => {
    if (searchQuery.value) {
        filteredEvents.value = props.events.filter(event =>
            event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    } else {
        filteredEvents.value = props.events;
    }
    filteredEvents.value = sortEventsByDate(filteredEvents.value);
    visibleEventsCount.value = 10; // Reset visible events count on search
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

const showMoreEvents = () => {
    visibleEventsCount.value += 10;
};

// Watch for changes in the searchQuery and update filteredEvents accordingly
watch(searchQuery, () => {
    searchEvent();
});

// Watch for changes in the props.events and update filteredEvents accordingly
watch(() => props.events, (newEvents) => {
    filteredEvents.value = sortEventsByDate(newEvents);
});

// Sort events by date on component mount
onMounted(() => {
    filteredEvents.value = sortEventsByDate(props.events);
});
</script>

<template>
    <div>
        <div class="button-group">
            <!-- Button to create an Event -->
            <UButton @click="handleShowAddPopup">
                Créer un événement
            </UButton>

            <!-- Search bar -->
            <div class="search-bar">
                <input type="text" v-model="searchQuery" placeholder="Rechercher un événement" />
                <span class="search-icon">
                    <i class="fas fa-search"></i>
                </span>
            </div>
        </div>

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
                    <tr v-for="event in filteredEvents.slice(0, visibleEventsCount)" :key="event.id">
                        <!-- Display the Event -->
                        <AdminEventManagementEvent :event="event" @showPopUpEvent="handleShowUpdatePopup" @showPopUpEventSuppression="handleShowConfirmationPopup" />
                    </tr>
                </tbody>
            </table>
            <div v-if="visibleEventsCount < filteredEvents.length" class="show-more-container">
                <UButton @click="showMoreEvents">
                    Afficher plus
                </UButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url("~/assets/css/admin/eventManagement.css");

.button-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.search-bar {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 5px 10px;
    width: 300px;
}

.search-bar input {
    border: none;
    background: none;
    outline: none;
    width: 100%;
    font-size: 16px;
    color: #333;
}

.search-bar .search-icon {
    color: #333;
    font-size: 18px;
}

.show-more-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
</style>