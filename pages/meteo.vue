<script setup lang="ts">
import { definePageMeta } from "#imports";
import type { WeatherData } from "~/models/weatherReport";

// page available without authentification
definePageMeta({
  auth: false
});

const { data: weather } = await useFetch<WeatherData[]>("/api/weatherReport", {
  method: "GET",
});

</script>

<template>
  <GlobalWrapper>
    <div class="container photovoltaique-wrap mx-auto text-lg">
      <PageHeader image="/photovoltaique/header.png" image-alt="Panneaux photovoltaïques"
                  title="Données Météo" />

      <section class="mt-5 description">
        <h2 class="font-extrabold text-3xl text-_primary-500">La météo de Gulli</h2>
        <div class="text-wrap flex flex-wrap justify-between">
          <div class="text mt-3 w-full md:w-2/3">
            <p> Lorem Ipsum</p>
            <ul>
              <li v-for="(item, index) in weather" :key="index">
                Temperature: {{ item.date }}, Humidity: {{ item.solarRadiation }}
              </li>
            </ul>
            <p> Lorem Ipsum 2 </p>
          </div>
        </div>
       </section>
    </div>
   </GlobalWrapper>
</template>