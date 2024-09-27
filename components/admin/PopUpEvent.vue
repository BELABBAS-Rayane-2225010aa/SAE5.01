<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Event } from "~/models/event";

// this popup is used to add or update an event

// Define the component's props using defineProps
const props = defineProps<{
    event: Event
}>();

const emit = defineEmits(['close', 'submit']);  // Emit the event to close the popup and submit the form

// Define the form data and methods to handle the form submission
const formData = ref<Event>({
    title: '',
    date: '',
    description: '',
    location: '',
    images: [],
    links: [],
} as unknown as Event);

const imageUrl = ref('');  // Image URL input
const link = ref(''); // Link URL input
const editImageIndex = ref<number | null>(null);  // Index of the image being edited
const editLinkIndex = ref<number | null>(null); // Index of the link being edited

// Watch for changes to the event prop and update the form data
watch(() => props.event, (newEvent) => {
  formData.value = { ...newEvent };
  // Ensure images and links are always arrays
  if (!Array.isArray(formData.value.images)) {
    formData.value.images = [];
  }
  if (!Array.isArray(formData.value.links)) {
    formData.value.links = [];
  }
}, { immediate: true });

// Add an image to the form data
const addImage = () => {
  if (imageUrl.value) {
    if (editImageIndex.value !== null) {
      formData.value.images[editImageIndex.value] = imageUrl.value;
      editImageIndex.value = null;
    } else {
      formData.value.images.push(imageUrl.value);
    }
    imageUrl.value = '';
  }
};

// Edit an image in the form data
const editImage = (index: number) => {
  imageUrl.value = formData.value.images[index];
  editImageIndex.value = index;
};

// Delete an image from the form data
const deleteImage = (index: number) => {
  formData.value.images.splice(index, 1);
};

// Add a link to the form data
const addLink = () => {
  if (link.value) {
    if (editLinkIndex.value !== null) {
      formData.value.links[editLinkIndex.value] = link.value;
      editLinkIndex.value = null;
    } else {
      formData.value.links.push(link.value);
    }
    link.value = '';
  }
};

// Edit a link in the form data
const editLink = (index: number) => {
  link.value = formData.value.links[index];
  editLinkIndex.value = index;
};

// Delete a link from the form data
const deleteLink = (index: number) => {
  formData.value.links.splice(index, 1);
};

// Handle the form submission
const handleSubmit = () => {
  emit('submit', formData.value);
};
</script>

<template>
  <div class="popup">
    <div class="popup-content">
      <p class="popupTitle">{{ props.event.id ? 'Modifier l\'événement' : 'Créer un événement' }}</p>

      <!-- Display the form -->
      <form @submit.prevent="handleSubmit">

        <!-- Title field -->
        <div class="form-group">
          <label for="title">Titre : </label>
          <input type="text" id="title" v-model="formData.title" required />
        </div>

        <!-- Description field -->
        <div class="form-group">
          <label for="description">Description : </label>
          <textarea id="description" v-model="formData.description" required></textarea>
        </div>

        <!-- Date field -->
        <div class="form-group">
          <label for="date">Date : </label>
          <input type="date" id="date" v-model="formData.date" required />
        </div>

        <!-- Location field -->
        <div class="form-group">
          <label for="location">Lieu : </label>
          <input type="text" id="location" v-model="formData.location" required />
        </div>

        <!-- Images field -->
        <div class="form-group">
          <label for="imageUrl">Ajouter ou modifier une image (URL) : </label>
          <div class="input-button-group">
            <input type="text" id="imageUrl" v-model="imageUrl" />
            <button type="button" @click="addImage">{{ editImageIndex !== null ? 'Modifier' : 'Ajouter' }} l'image</button>
          </div>
        </div>
        <div class="form-group">
          <h3>Images ajoutées : </h3>
          <table class="added-items-table">
            <tbody>
              <tr v-for="(image, index) in formData.images" :key="index">
                <td class="link-cell">
                  <a :href="image" target="_blank">{{ image }}</a>
                </td>
                <td class="button-cell">
                  <UButton type="button" @click="editImage(index)">Modifier</UButton>
                  <UButton type="button" @click="deleteImage(index)">Supprimer</UButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Links field -->
        <div class="form-group">
          <label for="link">Ajouter ou modifier un lien (URL) : </label>
          <div class="input-button-group">
            <input type="text" id="link" v-model="link" />
            <button type="button" @click="addLink">{{ editLinkIndex !== null ? 'Modifier' : 'Ajouter' }} le lien</button>
          </div>
        </div>
        <div class="form-group">
          <h3>Liens ajoutés : </h3>
          <table class="added-items-table">
            <tbody>
              <tr v-for="(link, index) in formData.links" :key="index">
                <td class="link-cell">
                  <p>{{ link }}</p>
                </td>
                <td class="button-cell">
                  <UButton type="button" @click="editLink(index)">Modifier</UButton>
                  <UButton type="button" @click="deleteLink(index)">Supprimer</UButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Submit button -->
        <div class="form-group">
          <UButton type="submit" class="submitBtn">Soumettre</UButton>
          <UButton type="button" @click="$emit('close')" class="submitBtn">Retour</UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url("~/assets/css/admin/popUpEvent.css");
</style>