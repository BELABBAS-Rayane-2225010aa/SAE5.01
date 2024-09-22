<script setup lang="ts">

// page available without authentification
definePageMeta({
  auth: false,
});

// get the informations from the route
const route = useRoute();
const id = route.params.id;
</script>

<template>
    <GlobalWrapper class="shop-wrapper">
        <MainTitle :text="`Evenement ${id}`" />
    </GlobalWrapper>
</template>
  
<style scoped>
/* Ajoutez vos styles ici */
</style>