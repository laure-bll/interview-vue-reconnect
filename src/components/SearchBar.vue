<script setup lang="ts">
import { ref, type Ref } from "vue";

const props = defineProps<{
  label: string;
  refetchData?: (options?: string) => void;
}>();

const search: Ref<string> = ref("");
const isSearching: Ref<boolean> = ref(false);

const onSubmitSearch = async () => {
  isSearching.value = true;
  if (props.refetchData) {
    await props.refetchData(
      search.value?.length ? `?name=${search.value}` : ""
    );
    isSearching.value = false;
  } else {
    isSearching.value = false;
  }
};
</script>

<template>
  <v-text-field
    class="SearchBar"
    v-model="search"
    :label="props.label"
    prepend-inner-icon="mdi-magnify"
    :loading="isSearching"
    :disabled="isSearching"
    single-line
    @click:append-inner="onSubmitSearch"
    v-on:keyup.enter="onSubmitSearch"
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
  max-width: 600px;
}
</style>
