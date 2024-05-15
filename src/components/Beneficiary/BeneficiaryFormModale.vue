<script setup lang="ts">
import { beneficiariesEndpoint } from "@/api/endpoints";
import ErrorAlert from "@/components/ErrorAlert.vue";
import axios from "axios";
import { reactive, ref, type Ref } from "vue";

const props = defineProps<{
  id?: string;
  name?: string;
  textButton: string;
  title: string;
  refetchData?: () => void;
}>();

const isModaleOpened: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);
const errorMessage: Ref<null | string> = ref(null);
const newProfile = reactive({ name: props.name });

const setName = (event: any) => {
  errorMessage.value = "";
  newProfile.name = event.target?.value;
};

const createOrUpdateBeneficiary = async () => {
  isLoading.value = true;
  const method: string = props.id !== undefined ? "PUT" : "POST";
  const url =
    props.id !== undefined
      ? `${beneficiariesEndpoint}/${props.id}`
      : beneficiariesEndpoint;

  try {
    await axios({
      url,
      method,
      data: { name: newProfile.name },
      headers: { "Content-Type": "application/json" },
    });

    isModaleOpened.value = false;
  } catch (err) {
    errorMessage.value = `${err}`;
  } finally {
    isLoading.value = false;

    if (props.refetchData) {
      props.refetchData();
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
                label="Name"
                @change="setName"
                autofocus
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="errorMessage">
            <ErrorAlert :errorMessage="errorMessage" />
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Annuler" variant="plain" @click="isModaleOpened = false"></v-btn>
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
