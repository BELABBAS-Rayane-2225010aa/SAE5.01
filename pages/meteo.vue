<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "WeatherComponent",
  setup() {
    const weather = ref(null);

    onMounted(async () => {
      try {
        // Appel de l'API interne via $fetch
        const weatherData = await $fetch('/api/weather', {
          method: 'GET',
        });
        weather.value = weatherData;
      } catch (error) {
        console.error("Erreur lors de la récupération des données météo : ", error);
      }
    });

    return { weather };
  },
});
</script>


<template>
  <div>
    <h1>Météo pour {{ weather?.cityName }}</h1>
    <p>Température : {{ weather?.temperatureValue }}°C</p>
    <p>Description : {{ weather?.temperatureDescription }}</p>
    <p>Lever du soleil : {{ weather?.sunRise }}</p>
    <p>Coucher du soleil : {{ weather?.sunSet }}</p>
    <img :src="`https://www.weatherbit.io/static/img/icons/${weather?.weatherIcon[0]}.png`" alt="Icon météo" />
  </div>
</template>


