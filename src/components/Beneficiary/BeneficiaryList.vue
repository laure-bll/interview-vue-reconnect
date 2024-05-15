<script setup lang="ts">
import type BeneficiaryType from "@/models/Beneficiary.ts";
import BeneficiaryCard from "@/components/Beneficiary/BeneficiaryCard.vue";

defineProps<{
  beneficiaries: BeneficiaryType[];
  title: string;
  displayActions?: boolean;
  refetchData?: () => void;
}>();
</script>

<template>
  <div>
    <h3 class="my-2">{{ title }}</h3>
    <div class="Beneficiaries-list">
      <div v-for="beneficiary in beneficiaries" :key="beneficiary.id" :cols="2">
        <BeneficiaryCard
          :refetchData="refetchData"
          :name="beneficiary.name"
          :id="beneficiary.id.toString()"
          :displayActions="displayActions"
        />
      </div>
    </div>
  </div>
</template>

<style>
.Beneficiaries-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
</style>
