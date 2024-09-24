<script setup lang="ts">
import type { Weather } from "~/models/weather";

const toast = useToast();


try {
  const weathers = await $fetch('/api/weather', {
    method: 'GET',
  })}
