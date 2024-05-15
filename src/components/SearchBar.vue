<script setup lang="ts">
import { ref, type Ref } from "vue";

const search: Ref<string> = ref("");
const isSearching: Ref<boolean> = ref(false);

defineProps<{
  label: string;
}>();
</script>

<template>
  <v-text-field
    class="SearchBar"
    v-model="search"
    :label="label"
    prepend-inner-icon="mdi-magnify"
    :loading="isSearching"
    single-line
  ></v-text-field>
</template>

<style>
.SearchBar {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
  margin: 1rem auto;
}
</style>
