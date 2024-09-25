<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import type { Weather } from "~/models/weather";

const toast = useToast();

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
        toast.add({
        title: "Une erreur est survenue lors de la récupération des données météorologiques. Veuillez réessayer plus tard.",
        icon: "i-heroicons-information-circle",
        color: "red",
        }); 
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
      <PageHeader image="/meteo/header.png" image-alt="Donnée météorologique"
                  title="Données météorologique" />

      <!-- SECTION METEO MODIFIEE AVEC FOND BLEU -->
      <section class="mt-5 description bg-gradient-to-b from-blue-500 to-blue-700 p-6 rounded-lg shadow-lg text-center text-white">
        <h2 class="font-extrabold text-4xl text-white mb-4 uppercase">{{ weather?.cityName }}</h2> 

        <div class="flex flex-col items-center justify-center mt-4">
          <p class="text-6xl font-bold mb-2">{{ weather?.temperatureValue }}°C</p>
          <p class="text-lg italic">{{ weather?.temperatureDescription }}</p>
          
          <img 
            :src="`https://www.weatherbit.io/static/img/icons/${weather?.weatherIcon[0]}.png`" 
            alt="Icon météo" 
            class="w-32 h-32 mt-6"
          />
        </div>

        <div class="grid grid-cols-2 gap-8 mt-8 border-t border-white pt-4">
          <div class="text-center">
            <p class="text-sm">Lever du soleil</p>
            <p class="text-lg font-semibold">{{ weather?.sunRise }}</p>
          </div>
          <div class="text-center">
            <p class="text-sm">Coucher du soleil</p>
            <p class="text-lg font-semibold">{{ weather?.sunSet }}</p>
          </div>
        </div>
      </section>
    </div>
  </GlobalWrapper>
</template>


