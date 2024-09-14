<script setup lang="ts">
import type { User } from "~/models/user";
import UserManager from "~/components/admin/UserManager.vue";

// Define a type that extends User with an additional confirmPassword property
type UserWithConfirmPassword = User & {
  confirmPassword: string;
};

// Define the props for the component, expecting an array of users
const { users } = defineProps<{ users: User[] }>();

// Reactive reference to track the loading state
const isLoading = ref<boolean>(false);

// Reactive reference to track the index of the selected user
const indexUserSelected = ref<number>(0);

// Function to add a new user to the managedUsers array
const addUser = (user: User) => {
  managedUsers.value.push({
    ...user,
    confirmPassword: "",
  });
};

// Initialize the managedUsers array with a default new user
const managedUsers = ref<UserWithConfirmPassword[]>([
  {
    email: "Nouvel utilisateur",
    role: "seller",
    password: "",
    confirmPassword: "",
  },
]);

// Add the existing users to the managedUsers array, each with an empty confirmPassword
managedUsers.value.push(
  ...users.map((user) => {
    return {
      ...user,
      confirmPassword: "",
    };
  }),
);

// Reactive reference to track the email of the selected user
const email = ref<string>(managedUsers.value[0].email);
</script>

<template>
  <div class="container">
    <h3>User Management</h3>

    <!-- Dropdown to select a user by email -->
    <USelect
      v-model="email"
      @change="
        (e) => {
          indexUserSelected = managedUsers.findIndex((user) => user.email == e);
        }
      "
      :options="managedUsers"
      option-attribute="email"
      class="w-fit"
    />

    <!-- UserManager component to manage the selected user -->
    <UserManager
      :user="managedUsers[indexUserSelected]"
      :isNew="indexUserSelected == 0"
      :addUser="addUser"
    />
  </div>
</template>

<style>
/* Styling for the container */
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>