<script setup lang="ts">
import type { User } from "~/models/user";
import { z } from "zod";
import { useFetchWithToast } from "~/composables/useFetchWithToast";
import sha256 from "crypto-js/sha256";

// Define a constant array for user roles
const ROLE_ENUM = ["admin", "seller"] as const;

// Define radio button options for user roles
const ROLE_RADIO = [
  {
    label: "Administrateur",
    value: ROLE_ENUM[0],
  },
  {
    label: "Vendeur",
    value: ROLE_ENUM[1],
  },
];

// Define the props for the component, expecting a user object, a boolean indicating if it's a new user, and a function to add a user
const props = defineProps<{ user: User; isNew?: boolean; addUser: (user: User) => void }>();

// Watch for changes in the user prop and update the state accordingly
watch(
  () => props.user,
  (user) => {
    state.email = user.email;
    state.role = user.role;
    state.password = "";
    state.confirmPassword = "";
  },
);

// Watch for changes in the isNew prop and reset the email state if it's a new user
watch(
  () => props.isNew,
  (isNew) => {
    if (isNew) {
      state.email = "";
    }
  },
);

// Define a schema for form validation using zod
const schema = z
  .object({
    email: z.string().email(),
    role: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Define the type for the schema
type Schema = z.output<typeof schema>;

// Initialize the reactive state with the user data
const state = reactive<Schema>({
  email: props.user.email,
  role: props.user.role,
  password: "",
  confirmPassword: "",
});

// Function to handle form submission
const onSubmit = async () => {
  if (props.isNew) {
    // If it's a new user, send a POST request to add the user
    await useFetchWithToast<User>(
      "/api/users",
      {
        successMessage: {
          title: "User added",
          description: "The user has been successfully added"
        },
        errorMessage: {
          title: "Error",
          description: "Unable to add the user",
        },
      },
      {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          role: state.role,
          password: sha256(state.password).toString(),
        }),
      },
    ).then((data: User|void) => {
      props.addUser((data) as User);
      state.email = "";
      state.role = ROLE_ENUM[0];
      state.password = "";
      state.confirmPassword = "";
    });
  } else {
    // If it's an existing user, send a PUT request to update the user
    await useFetchWithToast(
      "/api/users",
      {
        successMessage: {
          title: "User updated",
          description: "The user has been successfully updated",
        },
        errorMessage: {
          title: "Error",
          description: "Unable to update the user",
        },
      },
      {
        method: "PUT",
        body: JSON.stringify({
          email: state.email,
          role: state.role,
          password: sha256(state.password).toString(),
        }),
      },
    );
  }
};

// If it's a new user, reset the email state
if (props.isNew) {
  state.email = "";
}
</script>

<template>
  <!-- Form component to manage user data -->
  <UForm
    :schema="schema"
    :state="state"
    @submit="onSubmit"
    class="user-management-container"
  >
    <!-- Form group for email, only shown if it's a new user -->
    <UFormGroup v-if="props.isNew" label="E-mail" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <!-- Form group for role selection -->
    <UFormGroup label="Role" name="role">
      <URadioGroup v-model="state.role" :options="ROLE_RADIO" />
    </UFormGroup>
    
    <!-- Form group for password -->
    <UFormGroup :label="props.isNew ? 'Password' : 'New Password'" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    
    <!-- Form group for confirming the password -->
    <UFormGroup :label="props.isNew ? 'Confirm Password' : 'Confirm New Password'" name="confirmPassword">
      <UInput v-model="state.confirmPassword" type="password" />
    </UFormGroup>

    <!-- Submit button, label changes based on whether it's a new user or not -->
    <UButton type="submit">{{
      props.isNew ? "Add" : "Update"
    }}</UButton>
  </UForm>
</template>

<style scoped>
.user-management-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: start;
}
</style>