<script setup lang="ts">
import type { Event } from "~/models/event";

// page available without authentification
definePageMeta({
  auth: false,
});

// get the informations from the route
const route = useRoute();
const id = route.params.id;

// Fetch the event from the `/api/events/:id` endpoint using a GET request.
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
    <GlobalWrapper class="event-wrapper">
        <MainTitle :text="`${event?.title}`" />
        <NuxtImg :src="event?.images[0] ?? ''" />
        <p>{{ event?.description }}</p>
        <p>{{ event?.date }} {{ event?.time }}</p>
        <p>{{ event?.location }}</p>
        <p>
          <ul>
            <li v-for="link in event?.links">
              {{ link }}
            </li>
          </ul>
        </p>
        <p>
          <ul>
            <li v-for="(img, index) in event?.images.slice(1)" :key="index">
              <NuxtImg :src="img ?? ''" />
            </li>
          </ul>
        </p>
    </GlobalWrapper>
</template>
  
<style scoped>
</style>