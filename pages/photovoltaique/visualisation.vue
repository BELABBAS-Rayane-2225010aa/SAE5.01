<script setup lang="ts">
import { definePageMeta } from "#imports";

// page available without authentification
definePageMeta({
  auth: false,
});
</script>

<template>

  <!-- Energie produite -->
  <GlobalWrapper>
    <div class="overview">
      <SolarPanelOverview />
    </div>
  </GlobalWrapper>

  <!-- Bénéfices environmentaux -->
  <div class="greenwashing-wrapper">
    <SolarPanelGreenwashing />
  </div>

  <!-- production de l'énergie -->
  <GlobalWrapper>
    <div class="chart mt-5">
      <SolarPanelEnergyChart />
    </div>
  </GlobalWrapper>
</template>

<style scoped>
/* graph */
.chart {
  padding: 24px;
}
</style>