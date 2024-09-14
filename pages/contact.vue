<script setup lang="ts">
import { definePageMeta } from "#imports";
import { z } from "zod";

const IDENTITIES = ["student", "teacher", "company", "other"] as const;

// Different options for the dropdown menu
const IDENTITIES_SELECT = [
  {
    label: "Étudiant",
    value: IDENTITIES[0],
  },
  {
    label: "Enseignant",
    value: IDENTITIES[1],
  },
  {
    label: "Entreprise",
    value: IDENTITIES[2],
  },
  {
    label: "Autre",
    value: IDENTITIES[3],
  },
]

// page available without authentification
definePageMeta({
  auth: false
});

// Define a validation schema using Zod to validate the form data.
const schema = z.object({
  identity : z.enum(IDENTITIES),
  subject: z.string().min(1, "Requis"), // Must be non-empty
  message: z.string().min(1, "Requis"), // Must be non-empty
})

// Define a type based on the schema output to be used in the form state
type Schema = z.output<typeof schema>;

// Init the form
const state = reactive<Schema>({
  identity: "student",
  subject: "",
  message: "",
})

// When the form is submitted, an email is sent to the preferred address
const onSubmit = () => {
  window.location.href = "mailto:email@example.com?subject=[" + IDENTITIES_SELECT.find(identity => identity.value === state.identity)?.label + "] " + state.subject + "&body=" + state.message;
}
</script>

<template>
  <BlurBackground title="Contact">
    <div class="space-y-4">

      <!-- Form -->
      <UForm :state="state" :schema="schema" class="space-y-4" @submit="onSubmit">
        <div class="flex space-x-4">
          <UFormGroup label="Identité" name="identity" class="flex-1">
            <USelect v-model="state.identity" :options="IDENTITIES_SELECT" option-attribute="label" />
          </UFormGroup>
          <UFormGroup label="Sujet" name="subject" class="flex-1">
            <UInput v-model="state.subject" />
          </UFormGroup>
        </div>
        <UFormGroup label="Message" name="message">
          <UTextarea v-model="state.message" />
        </UFormGroup>
        <UButton class="w-full" type="submit">Envoyer</UButton>
      </UForm>

    </div>
  </BlurBackground>
</template>

<style scoped>

</style>
