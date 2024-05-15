<script setup lang="ts">
import { beneficiariesEndpoint } from "@/api/endpoints";
import { getAvatar } from "@/helpers/avatar";
import BeneficiaryFormModale from "@/components/Beneficiary/BeneficiaryFormModale.vue";
import axios from "axios";

const props = defineProps<{
  id: string;
  name: string;
  creationDate?: string;
  creatorEmail?: string;
  displayActions?: boolean;
  refetchData?: (options?: string) => void;
}>();

const deleteBeneficiary = async (id: string) => {
  try {
    await axios.delete(`${beneficiariesEndpoint}/${id}`);

    if (props.refetchData) props.refetchData();
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <v-card class="BeneficiaryCard">
    <v-img height="200px" :src="getAvatar(props.name)" cover></v-img>

    <v-card-title> {{ props.name }} </v-card-title>

    <v-card-subtitle v-if="creationDate">
      Date de création : {{ creationDate }}
    </v-card-subtitle>
    <v-card-subtitle v-if="creatorEmail">
      Par : {{ props.creatorEmail }}
    </v-card-subtitle>

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
