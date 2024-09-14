<script setup></script>

<template>
  <div>
    <!-- PWA manifest component -->
    <VitePwaManifest />

    <!-- Main layout component -->
    <NuxtLayout>
      <!-- Page content component -->
      <NuxtPage />
    </NuxtLayout>

    <!-- Notifications component -->
    <UNotifications />
  </div>
</template>