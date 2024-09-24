<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import type { Weather } from "~/models/weather";

// Define page metadata
definePageMeta({
  auth: false, // Page available without authentication
});

export default defineComponent({
  name: "WeatherComponent",
  setup() {
    // Reactive variable to store weather data
    const weather = ref<Weather>();

    // Fetch weather data when the component is mounted
    onMounted(async () => {
      try {
        // Call the internal API via $fetch
        const weatherData = await $fetch('/api/weather', {
          method: 'GET',
        });
        // Store the fetched data in the reactive variable
        weather.value = weatherData;
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Erreur lors de la récupération des données météo : ", error);
      }
    });
      
    // Return the reactive variable to the template
    return { weather };
  },
});
</script>


<template>
  <GlobalWrapper>
    <div class="container photovoltaique-wrap mx-auto text-lg">
      <PageHeader image="/photovoltaique/header.png" image-alt="Panneaux photovoltaïques"
                  title="Panneaux photovoltaïques" />

      <section class="mt-5 description">
        <h2 class="font-extrabold text-3xl text-_primary-500">Météo pour {{ weather?.cityName }}</h2> 
    <p>Température : {{ weather?.temperatureValue }}°C</p>
    <p>Description : {{ weather?.temperatureDescription }}</p>
    <p>oula</p>
    <p>Lever du soleil : {{ weather?.sunRise }}</p>
    <p>Coucher du soleil : {{ weather?.sunSet }}</p>
    <img :src="`https://www.weatherbit.io/static/img/icons/${weather?.weatherIcon[0]}.png`" alt="Icon météo" />
        </section>
    </div>
  </GlobalWrapper>

</template>


