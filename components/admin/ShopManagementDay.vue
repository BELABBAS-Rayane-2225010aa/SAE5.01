<script setup lang="ts">
import type { Day } from "~/models/shop";

// Define the component's props using defineProps
// Use props instead of destructuring because we need to watch the week and day props inside the component
const props = defineProps<{
  dayName: string;
  day: Day;
}>();

// Destructure the props that do not need to be watched inside the component
const { dayName } = props;

// Function to handle closing the day
// If the day is not open, reset the morning and afternoon times
const toggleClose = (isOpen: boolean): void => {
  if (!isOpen) {
    props.day.morningStart = "";
    props.day.morningEnd = "";
    props.day.afternoonStart = "";
    props.day.afternoonEnd = "";
  }
};

// Function to handle the lunch break
// If the lunch break is not enabled, reset the afternoon times
const toggleBreak = (withBreak: boolean): void => {
  if (!withBreak) {
    props.day.afternoonStart = "";
    props.day.afternoonEnd = "";
  }
};
</script>

<template>
  <!-- Display the day name -->
  <label class="font-bold">{{ dayName }}</label>
  <div class="form-container">
    <div class="flex gap-4">
      <!-- Input fields for morning times -->
      <UInput
        class="w-fit"
        type="time"
        v-model="props.day.morningStart"
        :disabled="!props.day.isOpen"
      />
      <UInput
        class="w-fit"
        type="time"
        v-model="props.day.morningEnd"
        :disabled="!props.day.isOpen"
      />

      <!-- Conditionally display the "and" separator if the lunch break is enabled -->
      <span v-if="props.day.withBreak">et</span>

      <!-- Input fields for afternoon times if the lunch break is enabled -->
      <UInput
        class="w-fit"
        v-if="props.day.withBreak"
        type="time"
        v-model="props.day.afternoonStart"
        :disabled="!props.day.isOpen"
      />
      <UInput
        class="w-fit"
        v-if="props.day.withBreak"
        type="time"
        v-model="props.day.afternoonEnd"
        :disabled="!props.day.isOpen"
      />
    </div>

    <!-- Toggle switches for lunch break and opening status -->
    <div class="flex gap-3">
      <div class="flex flex-col">
        <!-- Lunch Break -->
        <label>Lunch Break</label>
        <UToggle v-model="props.day.withBreak" @change="toggleBreak" />
      </div>

      <div class="flex flex-col">
        <!-- Open -->
        <label>Open</label>
        <UToggle v-model="props.day.isOpen" @change="toggleClose" />
      </div>
    </div>
  </div>

  <!-- Divider to separate the days -->
  <UDivider
    orientation="horizontal"
    class="mt-2"
    icon="i-heroicons-calendar-days"
  />
</template>

<style>
/* Styling for the form container */
.form-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}
</style>