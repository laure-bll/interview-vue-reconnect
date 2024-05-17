<script setup lang="ts">
import { getConnectedUser } from "@/api/auth";
import { beneficiariesEndpoint } from "@/api/endpoints";
import rqt from "@/api/requests";
import ErrorAlert from "@/components/ErrorAlert.vue";
import { reactive, ref, type Ref } from "vue";

const props = defineProps<{
  id?: string;
  name?: string;
  textButton: string;
  title: string;
  refetchData?: (options?: string) => void;
}>();

const isModaleOpened: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);
const errorMessage: Ref<null | string> = ref(null);
const newProfile = reactive({ name: "" });

const setName = (event: any) => {
  errorMessage.value = "";
  newProfile.name = event.target?.value;
};

const closeModale = () => {
  newProfile.name = "";
  isModaleOpened.value = false;
  errorMessage.value = "";
  isLoading.value = false;
};

const createOrUpdateBeneficiary = async () => {
  isLoading.value = true;

  if (newProfile?.name?.length === 0) {
    errorMessage.value = "Le nom est requis.";
    isLoading.value = false;
  } else {
    const method = props.id !== undefined ? "PUT" : "POST";
    const url =
      props.id !== undefined
        ? `${beneficiariesEndpoint}/${props.id}`
        : beneficiariesEndpoint;

    const creator = getConnectedUser()?.username;

    if (creator) {
      await rqt({
        url,
        method,
        data: { name: newProfile.name, creator },
        successCallback: () => {
          closeModale();
          if (props.refetchData) {
            props.refetchData();
          }
        },

        failureCallback: (err) => {
          errorMessage.value = err?.response?.data?.message ?? "Une erreur est survenue.";
          isLoading.value = false;
        },
      });
    } else {
      errorMessage.value = "Une erreur est survenue. Merci de vous connecter à nouveau";
      isLoading.value = false;
    }
  }
};
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="isModaleOpened" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          :text="props.textButton"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>
      <v-card prepend-icon="mdi-account" :title="props.title">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="Nom du bénéficiaire"
                @change="setName"
                v-on:keyup.enter="createOrUpdateBeneficiary"
                autofocus
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="errorMessage">
            <v-col cols="12">
              <ErrorAlert :errorMessage="errorMessage" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Annuler" variant="plain" @click="closeModale"></v-btn>
          <v-btn
            color="primary"
            text="Sauvegarder"
            variant="tonal"
            :loading="isLoading"
            :disabled="isLoading"
            @click="createOrUpdateBeneficiary"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
