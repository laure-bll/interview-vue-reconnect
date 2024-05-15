<script setup lang="ts">
import { ref, type Ref, onMounted, reactive } from "vue";
import names from "@/names";
import { beneficiariesEndpoint } from "@/api/endpoints";
import BeneficiaryList from "@/components/Beneficiary/BeneficiaryList.vue";
import type BeneficiaryType from "@/models/Beneficiary.ts";
import SearchBar from "@/components/SearchBar.vue";
import BeneficiaryFormModale from "@/components/Beneficiary/BeneficiaryFormModale.vue";
import rqt from "@/api/requests";

const data: { beneficiaries: null | BeneficiaryType[] } = reactive({
  beneficiaries: null,
});

const isFetching: Ref<boolean> = ref(true);

const getBeneficiaries = async (options?: string) => {
  await rqt({
    url: beneficiariesEndpoint + (options ?? ""),
    method: "GET",
    successCallback: (res) => {
      data.beneficiaries = res.data["hydra:member"];
      isFetching.value = false;
    },
    failureCallback: (err) => {
      isFetching.value = false;
    },
  });
};

const refetchData = (options?: string) => getBeneficiaries(options);
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
      <BeneficiaryFormModale
        title="Nouveau bénéficiaire"
        textButton="Créer un bénéficiaire"
        :refetchData="refetchData"
      />
      <SearchBar label="Rechercher un bénéficiaire" :refetchData="refetchData" />
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
