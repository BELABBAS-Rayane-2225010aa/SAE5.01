<script setup lang="ts">
const emit = defineEmits(['confirm', 'cancel']);  // Emit the event to confirm or cancel the action
</script>

<template>
  <!-- Display the confirmation popup -->
  <div class="popup">
    <div class="popup-content">
      <h2>Confirmer la suppression</h2>
      <p>Êtes-vous sûr de vouloir supprimer cet événement ?</p>
      <button @click="$emit('confirm')">Oui</button>
      <button @click="$emit('cancel')">Non</button>
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