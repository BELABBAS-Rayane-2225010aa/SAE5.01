<script setup lang="ts">
import type { Event } from "~/models/event";

// page available without authentification
definePageMeta({
  auth: false,
});

// get the informations from the route
const route = useRoute();
const id = route.params.id;

// Fetch the event from the `/api/events/${id}` endpoint using a GET request.
// It expects a response of an `Event` object and stores it in the `event` variable.
const { data: event, error } = await useFetch<Event>(`/api/event/get/${id}`, {
  method: "GET",
});

// Handle potential errors
if (error.value) {
  console.error("Failed to fetch event:", error.value);
}
</script>

<template>
  <!-- Display the event details -->
  <GlobalWrapper class="global-wrapper">
    <MainTitle :text="`${event?.title}`" class="event-title" />
    <NuxtImg :src="event?.images[0] ?? ''" class="event-titleImage" />
    <div class="event-text">
      <p>{{ event?.description }}</p>
      <p>{{ event?.date }} {{ event?.time }}</p>
      <p>{{ event?.location }}</p>
      <div>
        <ul>
          <li v-for="link in event?.links" :key="link">
            {{ link }}
          </li>
        </ul>
      </div>
    </div>
    <div class="event-images">
      <li v-for="(img, index) in event?.images.slice(1)" :key="index">
        <NuxtImg :src="img ?? ''" class="event-image" />
      </li>
    </div>
  </GlobalWrapper>
</template>
  
<style scoped>
@import url("~/assets/css/evenement/eventIdPage.css");
</style>