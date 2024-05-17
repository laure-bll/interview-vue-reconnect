<script setup lang="ts">
import AppBar from "@/components/AppBar.vue";
import BeneficiaryDashboard from "@/components/Beneficiary/BeneficiaryDashboard.vue";
</script>

<template>
  <div class="App">
    <v-layout>
      <header>
        <AppBar />
      </header>
      <v-main>
        <v-container fluid>
          <BeneficiaryDashboard />
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>

<style>
.App {
  min-height: 100vh;
  text-align: center;
}
</style>
