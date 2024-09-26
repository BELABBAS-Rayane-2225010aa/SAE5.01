<script setup lang="ts">
const emit = defineEmits(['confirm', 'cancel']);  // Emit the event to confirm or cancel the action
</script>

<template>
  <!-- Display the confirmation popup -->
  <div class="popup">
    <div class="popup-content">
      <p class="popupTitle">Confirmer la suppression</p>
      <p>Êtes-vous sûr de vouloir supprimer cet événement ?</p>
      <UButton @click="$emit('confirm')"  class="submitBtn">Oui</UButton>
      <UButton @click="$emit('cancel')"  class="submitBtn">Non</UButton>
    </div>
  </div>
</template>

<style scoped>
@import url("~/assets/css/admin/popUpEvent.css");
</style>