<script lang="ts" setup>
import type { Shop } from "~/models/shop";
import type { User } from "~/models/user";
import type { Event } from "~/models/event";

// get current user session
const { getSession } = useAuth();

// Fetch the list of shops from the `/api/shops` endpoint.
// This makes a GET request to the API and expects the response to be an array of Shop objects.
const { data: shops } = await useFetch<Shop[]>("/api/shops", {
  method: "GET",
});


// Fetch the list of users from the `/api/users?safe=true` endpoint.
// This makes a GET request and expects the response to be an array of User objects.
const { data: users } = await useFetch<User[]>("/api/users?safe=true", {
  method: "GET",
});

// Fetch the list of events from the `/api/events` endpoint.
// This makes a GET request to the API and expects the response to be an array of Event objects.
const { data: events } = await useFetch<Event[]>("/api/event/all/events", {
  method: "GET",
}); 

// get current user session
const session = await getSession();

const items = [
  {
    label: "Horaires"
  },
  {
    label: "Evenements"
  }
]

// check if the current user is an administrator
// If so, add an additional "Utilisateurs" tab
if (session.role == 'admin') {
    items.push({
    label: "Utilisateurs"
  })
}
</script>

<template>
  <GlobalWrapper>
    <h2>Administration</h2>

    <!-- A tab is created for every items -->
    <UTabs :items="items">
      <template #item="{ item }">
        <!-- This section is displayed if the current tab is "Horaires" -->
       <AdminShopsManagement
         v-if="shops && item.label === 'Horaires'"
         :shops="shops"
         class="animate__animated animate__fadeIn"
       />

       <!-- This section is displayed if the current tab is "Evenements" -->
       <AdminEventManagement
        v-if="events && item.label === 'Evenements'"
          :events="events"
          class="animate__animated animate__fadeIn"
        />

        <!-- This section is displayed if the current tab is "Utilisateurs" -->
      <AdminUsersManagement
        v-if="users && item.label === 'Utilisateurs' && session.role === 'admin'"
        :users="users"
        class="animate__animated animate__fadeIn"
      />
    </template>
  </UTabs>
</GlobalWrapper>
</template>

<style></style>
