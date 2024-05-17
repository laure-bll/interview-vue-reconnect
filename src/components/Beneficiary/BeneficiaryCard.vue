<script setup lang="ts">
import { beneficiariesEndpoint } from "@/api/endpoints";
import { getAvatar } from "@/helpers/avatar";
import BeneficiaryFormModale from "@/components/Beneficiary/BeneficiaryFormModale.vue";
import dateFormatter from "@/helpers/dateFormatter";
import rqt from "@/api/requests";

const props = defineProps<{
  id: string;
  name: string;
  createdAt?: string;
  creator?: string;
  displayActions?: boolean;
  refetchData?: (options?: string) => void;
}>();

const deleteBeneficiary = async (id: string) => {
  await rqt({
    url: `${beneficiariesEndpoint}/${id}`,
    method: "DELETE",
    successCallback: () => {
      if (props.refetchData) props.refetchData();
    },
    failureCallback: (err) => {
      console.log(err);
    },
  });
};
</script>

<template>
  <v-card class="BeneficiaryCard">
    <v-img height="200px" :src="getAvatar(props.name)" cover></v-img>

    <v-card-title> {{ props.name }} </v-card-title>

    <v-card-subtitle v-if="createdAt">
      Date de création : {{ dateFormatter(createdAt) }}
    </v-card-subtitle>
    <v-card-subtitle v-if="creator"> Par : {{ props.creator }} </v-card-subtitle>

    <v-card-actions v-if="displayActions">
      <v-btn
        color="orange-lighten-2"
        text="Supprimer"
        @click="deleteBeneficiary(props.id)"
      ></v-btn>
      <v-spacer></v-spacer>
      <BeneficiaryFormModale
        :title="`Modifier le profil de ${props.name}`"
        textButton="Modifier"
        :name="props.name"
        :id="props.id"
        :refetchData="refetchData"
      />
    </v-card-actions>
  </v-card>
</template>

<style>
.BeneficiaryCard {
  flex-basis: 0;
}
</style>
