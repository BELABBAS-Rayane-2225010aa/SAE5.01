<script setup lang="ts">
import { ref } from 'vue';
import type { Event } from "~/models/event";

// Define the component's props using defineProps
const props = defineProps<{
    event: Event
}>();

const emit = defineEmits(['showPopUpEvent','showPopUpEventSuppression']); // Emit the event to show the popup to update or delete the event
</script>

<template>
    <!-- Display the event information -->
    <td class="title">{{ props.event.title }}</td>
    <td>{{ props.event.date }}</td>
    <td>{{ props.event.location }}</td>
    <td>
      <div>
        <UButton @click="$emit('showPopUpEvent', props.event)">
          Modifier
        </UButton>
        <UButton @click="$emit('showPopUpEventSuppression', props.event)">
          Supprimer
        </UButton>
      </div>
    </td>
</template>
  
<style scoped>
@import url("~/assets/css/admin/eventManagementEvent.css");
</style>