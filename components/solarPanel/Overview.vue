<script setup lang="ts">
import type { Overview } from "~/models/solarPanel/overview";

// Toast notifications for messages
const toast = useToast();

// Define the initial structure of the overviewData object
let overviewData: Overview = {
  currentPower: 0,
  lifeTimeDataEnergy: 0,
  lastYearDataEnergy: 0,
  lastMonthDataEnergy: 0,
  lastDayDataEnergy: 0,
  lastUpdateTime: "",
};

// Fetch data from the API and handle errors
try {
  overviewData = await $fetch<Overview>("/api/solarPanel/v1/overview");
} catch (error) {
  console.error(error);
  toast.add({
    title: "Une erreur est survenue lors de la récupération de données. Veuillez réessayer plus tard.",
    icon: "i-heroicons-information-circle",
    color: "red",
  }); // Show a oast notification for error
}
</script>

<template>
  <PageHeader title="Laissons parler les chiffres" image="/photovoltaique/visualisation/header.jpg"
              image-alt="Panneaux solaires" />
  
  <!-- Section for displaying power information -->
  <section class="powers mt-5 relative">
    <div class="current-power">
      <!-- Information about current power -->
      <div class="information">
        <h3>Puissance actuelle</h3>
        <p>{{ overviewData.currentPower }} Watt</p>
      </div>

      <div class="arrow left">
        <div class="line bg-black dark:bg-white"></div>
        <div class="point border-black dark:border-white"></div>
      </div>

      <!-- Image of solar panel -->
      <NuxtImg src="/photovoltaique/visualisation/solarPanel.svg" alt="Solar panel illustration"
               class="solar-panel-illustration" />

      <div class="arrow right">
        <div class="line bg-black dark:bg-white"></div>
        <div class="point border-black dark:border-white"></div>
      </div>

      <!-- Information about current production -->
      <div class="information">
        <h3>Production actuelle</h3>
        <p>Watt</p>
      </div>
    </div>

    <h2 class="font-bold text-2xl text-center mt-5">Energie produite</h2>

    <!-- Section for displaying historical energy production data -->
    <div class="power-history mt-8">
      <div class="power">
        <h3>Depuis l'installation</h3>
        <p>{{ overviewData.lifeTimeDataEnergy }} Wh</p>
      </div>

      <div class="power">
        <h3>L'année précédente</h3>
        <p>{{ overviewData.lastYearDataEnergy }} Wh</p>
      </div>

      <div class="power">
        <h3>Le mois précédent</h3>
        <p>{{ overviewData.lastMonthDataEnergy }} Wh</p>
      </div>

      <div class="power">
        <h3>Le jour précédent</h3>
        <p>{{ overviewData.lastDayDataEnergy }} Wh</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("~/assets/css/solarPanel/overview.css");
</style>
