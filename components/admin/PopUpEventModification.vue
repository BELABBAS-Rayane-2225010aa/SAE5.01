<script setup lang="ts">
import { ref, watch } from 'vue';
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

const imageUrl = ref('');  // Image URL input
const link = ref(''); // Link URL input
const editImageIndex = ref<number | null>(null);  // Index of the image being edited
const editLinkIndex = ref<number | null>(null); // Index of the link being edited

// Watch for changes to the event prop and update the form data
watch(() => props.event, (newEvent) => {
  formData.value = { ...newEvent };
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
      <h2>Modifier l'événement</h2>

      <!-- Display the form to update the event -->
      <form @submit.prevent="handleSubmit">

        <div>
          <label for="title">Titre</label>
          <input type="text" id="title" v-model="formData.title" required />
        </div>

        <div>
          <label for="description">Description</label>
          <textarea id="description" v-model="formData.description" required></textarea>
        </div>

        <div>
          <label for="date">Date</label>
          <input type="date" id="date" v-model="formData.date" required />
        </div>

        <div>
          <label for="location">Lieu</label>
          <input type="text" id="location" v-model="formData.location" required />
        </div>

        <div>
          <label for="imageUrl">Ajouter ou modifier une image (URL)</label>
          <input type="text" id="imageUrl" v-model="imageUrl" />
          <button type="button" @click="addImage">{{ editImageIndex !== null ? 'Modifier' : 'Ajouter' }} l'image</button>
        </div>
        <div>
          <h3>Images ajoutées</h3>
          <ul>
            <li v-for="(image, index) in formData.images" :key="index">
              <a :href="image" target="_blank">{{ image }}</a>
              <button type="button" @click="editImage(index)">Modifier</button>
              <button type="button" @click="deleteImage(index)">Supprimer</button>
            </li>
          </ul>
        </div>

        <div>
          <label for="link">Ajouter ou modifier un lien (URL)</label>
          <input type="text" id="link" v-model="link" />
          <button type="button" @click="addLink">{{ editLinkIndex !== null ? 'Modifier' : 'Ajouter' }} le lien</button>
        </div>
        <div>
          <h3>Liens ajoutés</h3>
          <ul>
            <li v-for="(link, index) in formData.links" :key="index">
              <p>{{ link }}</p>
              <button type="button" @click="editLink(index)">Modifier</button>
              <button type="button" @click="deleteLink(index)">Supprimer</button>
            </li>
          </ul>
        </div>
        
        <button type="submit">Submit</button>
        <button type="button" @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: rgb(0, 0, 0);
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

button {
  margin-top: 10px;
}
</style>