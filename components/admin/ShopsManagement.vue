<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import type { Shop } from "~/models/shop";

// Define the Item type which extends the Shop type with an additional label property
export type Item = {
  label: string;
} & Shop;

// Define the props for the component, expecting an array of shops
const { shops } = defineProps<{
  shops: Shop[];
}>();

// Use composable functions to get weeks and load state
const { weeks } = useWeek();
const { loadState } = useShopManagement();

// Initialize reactive references and state
const week = ref(weeks[0].value);
const isLoading = ref<boolean>(false);
const shopNumber = ref<number>(0);
const state = reactive<Shop[]>(loadState(shops || []));

// Function to create items from shops, adding a label property
const createItems = (shops: Shop[]): Item[] => {
  return shops.map((shop: Shop) => ({
    label: shop.name,
    ...shop,
  }));
};

// Initialize items with the created items from shops
const items = ref<Item[]>(createItems(shops || []));

// Array of days
const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

// Function to handle form submission
// Sends a PUT request to update shop hours and handles loading state and errors
const onSubmit = async (event: FormSubmitEvent<Shop[]>) => {
  const shopsCopy = [...event.data];

  try {
    isLoading.value = true;
    await useFetchWithToast(
      "api/shops",
      {
        successMessage: {
          description: "Les horaires ont bien été enregistrés",
          title: "Succès",
        },
        errorMessage: {
          description:
            "Une erreur est survenue lors de l'enregistrement des horaires",
          title: "Erreur",
        },
      },
      {
        method: "PUT",
        body: JSON.stringify(shopsCopy),
      },
    );
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <h3>Gestion des horaires de l'épicerie solidaire</h3>

    <p class="shop__select">
      Semaine :
      <!-- Dropdown to select the week -->
      <USelect
        v-model="week"
        :options="weeks"
        option-attribute="name"
        value-attribute="value"
        icon="i-heroicons-calendar-days"
        @change="(e) => (week = ~~e)"
      />
    </p>

    <!-- Tabs to switch between different shops -->
    <UTabs
      :items="items"
      orientation="vertical"
      :ui="{
        wrapper: 'flex items-start gap-4 flex-wrap',
        list: { width: 'w-48' },
      }"
      @change="(e) => (shopNumber = ~~e)"
    >
      <template #item="{ item }">
        <!-- Form to manage shop hours -->
        <UForm :state="state" @submit="onSubmit">
          <UButton type="submit" :loading="isLoading">Enregistrer</UButton>

          <!-- List of days with their respective management components -->
          <ul class="shop__ul">
            <li v-for="(dayName, index) in days" :key="index">
              <AdminShopManagementDay
                :day-name="dayName"
                :day="
                  week === state[shopNumber].currentWeek.number
                    ? state[shopNumber].currentWeek.days[index]
                    : state[shopNumber].nextWeek.days[index]
                "
              />
            </li>
          </ul>
        </UForm>
      </template>
    </UTabs>
  </div>
</template>

<style>
@import url("~/assets/css/admin/shopsManagement.css");
</style>