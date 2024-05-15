<script setup lang="ts">
import axios from "axios";
import { ref, type Ref, onMounted, reactive, watch, onUpdated } from "vue";
import names from "@/names";
import { beneficiariesEndpoint } from "@/api/endpoints";
import BeneficiaryList from "@/components/Beneficiary/BeneficiaryList.vue";
import type BeneficiaryType from "@/models/Beneficiary.ts";
import SearchBar from "@/components/SearchBar.vue";

const data: { beneficiaries: null | BeneficiaryType[] } = reactive({
  beneficiaries: null,
});

const isFetching: Ref<boolean> = ref(true);

const getBeneficiaries = async () => {
  try {
    const response = await axios.get(beneficiariesEndpoint);
    data.beneficiaries = response.data["hydra:member"];
  } catch (err) {
    console.log(err);
  } finally {
    isFetching.value = false;
  }
};

const refetchData = () => getBeneficiaries();
onMounted(() => getBeneficiaries());

const beneficiaryNames: BeneficiaryType[] = [...Array(10).keys()].map(
  (id: number) => ({
    name: names[Math.floor(Math.random() * names.length)],
    id,
  })
);
</script>

<template>
  <v-card class="mx-auto bg-transparent" max-width="65%">
    <v-container fluid>
      <v-btn> Créer un bénéficiaire </v-btn>
      <SearchBar label="Rechercher un bénéficiaire" />
      <BeneficiaryList title="Non stockés" :beneficiaries="beneficiaryNames" />
      <div v-if="data?.beneficiaries">
        <BeneficiaryList
          :refetchData="refetchData"
          title="En base de données"
          :beneficiaries="data?.beneficiaries"
          :displayActions="true"
        />
      </div>
    </v-container>
  </v-card>
</template>
