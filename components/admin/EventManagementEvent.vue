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
    <td class="title">{{ props.event.title }}</td>
    <td>{{ props.event.date }}</td>
    <td>{{ props.event.location }}</td>
    <td>
      <div class="flex gap-3">
        <UButton class="cardButtonTechno" @click="$emit('showPopUpEvent', props.event)">
          Modifier
        </UButton>
        <UButton class="cardButtonTechno" @click="$emit('showPopUpEventSuppression', props.event)">
          Supprimer
        </UButton>
      </div>
    </td>
</template>
  
<style scoped>
@import url("~/assets/css/admin/eventManagementEvent.css");

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Assurez-vous que le popup est au-dessus des autres éléments */
}

.popup-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 45vw;
    font-size: 1.1rem;
}
</style>