<script setup lang="ts">
import { Chart as ChartJS } from "chart.js";
import { Line } from "vue-chartjs";
import { defaultChartOptions } from "~/components/charts/defaultChartOptions.js";
import { registerables } from "chart.js";

// Register all necessary components with Chart.js
ChartJS.register(...registerables);

// Define the props for the component, expecting data and optional options
let { data, options } = defineProps({
  data: {
    type: Object,
    required: true, // Data is required
  },
  options: {
    type: Object, // Options are optional
  },
});

// Merge the default chart options with the provided options
options = {
  ...defaultChartOptions,
  ...options,
};
</script>

<template>
  <!-- Render the Line chart with the provided data and options -->
  <Line
    chart-id="test-chart"
    :data="data"
    :options="options"
    style="height: 100%; width: 100%"
  />
</template>