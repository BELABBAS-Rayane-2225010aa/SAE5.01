<script setup lang="ts">
import { ref } from 'vue';
import type { Event } from "~/models/event";

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

const imageUrl = ref('');   // Image URL input

// Add an image to the form data
const addImage = () => {
  if (imageUrl.value) {
    formData.value.images.push(imageUrl.value);
    imageUrl.value = '';
  }
};

const link = ref('');   // Link URL input

// Add a link to the form data
const addLink = () => {
  if (link.value) {
    formData.value.links.push(link.value);
    link.value = '';
  }
};

// Handle the form submission
const handleSubmit = () => {
emit('submit', formData.value);
};
</script>

<template>
    <div class="popup">
        <div class="popup-content">
            <p class="popupTitle">Créer un nouvel événement</p>

            <!-- Display the form to create a new event -->
            <form @submit.prevent="handleSubmit">

                <div class="form-group">
                    <label for="title">Titre : </label>
                    <input type="text" id="title" v-model="formData.title" required />
                </div>

                <div class="form-group">
                    <label for="description">Description : </label>
                    <textarea id="description" v-model="formData.description" required></textarea>
                </div>

                <div class="form-group">
                    <label for="date">Date : </label>
                    <input type="date" id="date" v-model="formData.date" required />
                </div>

                <div class="form-group">
                    <label for="location">Lieu : </label>
                    <input type="text" id="location" v-model="formData.location" required />
                </div>

                <div class="form-group">
                    <label for="imageUrl">Ajouter une image (URL) : </label>
                    <div class="input-button-group">
                        <input type="text" id="imageUrl" v-model="imageUrl" />
                        <button type="button" @click="addImage">Ajouter l'image</button>
                    </div>
                </div>
                <div class="form-group">
                    <h3>Images ajoutées : </h3>
                    <ul>
                        <li v-for="(image, index) in formData.images" :key="index">
                            <a :href="image" target="_blank">{{ image }}</a>
                        </li>
                    </ul>
                </div>

                <div class="form-group">
                    <label for="link">Ajouter un lien (URL) : </label>
                    <div class="input-button-group">
                        <input type="text" id="link" v-model="link" />
                        <button type="button" @click="addLink">Ajouter le lien</button>
                    </div>
                </div>
                <div class="form-group">
                    <h3>Liens ajoutés : </h3>
                    <ul>
                        <li v-for="(link, index) in formData.links" :key="index">
                            <p>{{ link }}</p>
                        </li>
                    </ul>
                </div>
                
                <div class="form-group">
                    <UButton type="submit" class="submitBtn">Ajouter</UButton>
                    <UButton type="button" @click="$emit('close')" class="submitBtn">Retour</UButton>
                </div>
            </form>
        </div>
    </div>
</template>
  
<style scoped>
@import url("~/assets/css/admin/popUpEventCreation.css");
</style>