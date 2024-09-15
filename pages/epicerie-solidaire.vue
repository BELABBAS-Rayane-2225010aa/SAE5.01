<script setup lang="ts">
import { definePageMeta } from "#imports";
import type { Shop } from "~/models/shop";

// page available without authentification
definePageMeta({
  auth: false,
});

// Define a custom type `Item` that combines a `label` string with all properties of a `Shop`.
export type Item = {
  label: string;
} & Shop;

// Fetch the list of shops from the `/api/shops` endpoint using a GET request.
// It expects a response of an array of `Shop` objects and stores it in the `shops` variable.
const { data: shops } = await useFetch<Shop[]>("/api/shops", {
  method: "GET",
});

// Function to transform an array of `Shop` objects into an array of `Item` objects.
const createItems = (shops: Shop[]): Item[] => {
  return shops.map((shop: Shop) => ({
    label: shop.name,
    ...shop,
  }));
};
// Create a reactive `items` reference that stores the transformed shops.
const items = ref<Item[]>(createItems(shops.value || []));
</script>

<template>
  <GlobalWrapper class="shop-wrapper">
    <MainTitle text="Epicerie solidaire" />

    <p class="introduction">
      La Fédération Aix-Marseille Interasso (FAMI) a été créée en 2012 pour défendre les droits des étudiants et
      améliorer leurs conditions de vie. Face à une précarité étudiante croissante révélée par une enquête, la FAMI a
      ouvert des épiceries solidaires AGORAé sur les campus d'Aix-Marseille, proposant des produits à bas prix et
      diverses activités. Un nouveau projet d'épicerie solidaire ouvrira fin 2023 au campus aixois, soutenu par des
      associations étudiantes et le réseau Alumni.
    </p>

    <SolidaryGroceryTabs :items="items" />
  </GlobalWrapper>
</template>

<style>
@import url("~/assets/css/solidaryGrocery.css");
</style>
