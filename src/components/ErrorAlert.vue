<script setup lang="ts">
defineProps<{
  errorMessage: string;
}>();
</script>

<template>
  <v-alert
    max-width="600"
    class="mx-auto mt-2"
    border="start"
    border-color="error"
    elevation="2"
    :text="errorMessage"
    v-if="errorMessage"
  ></v-alert>
</template>
