<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

definePageMeta({
  auth: false,
});

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


