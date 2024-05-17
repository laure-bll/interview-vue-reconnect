<script setup lang="ts">
import illustration from "@/assets/notfound.webp";
</script>

<template>
  <v-container class="NotFound-Container">
    <h1>Cette page n'existe pas</h1>
    <a href="/">Retourner à la page d'accueil</a>
    <div class="NotFound-Illustration">
      <v-img :src="illustration" alt="Route longeant un chantier" />
    </div>
  </v-container>
</template>

<style>
.NotFound-Container {
  color: white;
  min-height: 100vh;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.NotFound-Illustration {
  min-width: 600px;
  min-height: 600px;
  max-width: 100%;
  max-height: 100%;
}
img {
  width: 100%;
  object-fit: contain;
  margin: 1rem auto;
}
</style>
