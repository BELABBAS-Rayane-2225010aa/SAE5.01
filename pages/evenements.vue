<script setup lang="ts">
import { ref } from 'vue';
import type { Event } from "~/models/event";

// page available without authentification
definePageMeta({
  auth: false,
});

// Define a custom type `Item` that combines a `label` string with all properties of a `Event`.
export type Item = {
  label: string;
} & Event;

// Fetch the list of events from the `/api/event/all/events` endpoint using a GET request.
// It expects a response of an array of `Event` objects and stores it in the `events` variable.
const { data: events, error } = await useFetch<Event[]>("/api/event/all/events", {
  method: "GET",

});

// Function to transform an array of `Events` objects into an array of `Item` objects.
const createItems = (events: Event[]): Item[] => {
  return events.map((event: Event) => ({
    label: event.title,
    ...event,
  }));
};

// Create a reactive `items` reference that stores the transformed events.
const items = ref<Item[]>(createItems(events.value || []));

// Handle potential errors
if (error.value) {
  console.error("Failed to fetch events:", error.value);
}
</script>

<template>
  <GlobalWrapper class="shop-wrapper">
    <MainTitle text="Nos Evenements" />
    <div class="content-techno">
      <EvenementsCardInfo
        v-for="item in items"
        :itemInfos="item"
      />
    </div>
  </GlobalWrapper>
</template>