<script setup lang="ts">
import { loginEndpoint, backendUrl } from "@/api/endpoints";
import router from "@/router";
import axios from "axios";
import ErrorAlert from "@/components/ErrorAlert.vue";
import { ref, type Ref, reactive } from "vue";

const loading: Ref<boolean> = ref(false);
const errorMessage: Ref<null | string> = ref(null);
const credentials = reactive({
  email: "",
  password: "",
});

const validate = async () => {
  const email: string = credentials.email;
  const password: string = credentials.password;
  const valid: boolean = !!email.length && !!password.length;

  if (valid) {
    loading.value = true;

    try {
      const res = await axios.post(
        loginEndpoint,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = JSON.stringify(res.data.token);
      localStorage.setItem("api_token", token);
      loading.value = false;
      router.push("dashboard");
    } catch (err) {
      errorMessage.value = err.toString();
      loading.value = false;
    }
  } else {
    errorMessage.value = "Merci de remplir tous les champs.";
  }
};

const setEmail = (e: any) => (credentials.email = e.target?.value);
const setPassword = (e: any) => (credentials.password = e.target?.value);

const resetValidation = () => {
  errorMessage.value = null;
  loading.value = false;
};
</script>

<template>
  <v-card class="mx-auto text-center" max-width="600">
    <v-container>
      <v-form ref="form">
        <v-text-field
          type="email"
          :rules="[(value) => !!value || 'Un email valide est requis']"
          label="Email"
          @click="resetValidation"
          @change="setEmail"
        ></v-text-field>
        <v-text-field
          :rules="[(value) => !!value || 'Le mot de passe est requis']"
          type="password"
          label="Mot de passe"
          @click="resetValidation"
          @change="setPassword"
        ></v-text-field>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn block :disabled="loading" :loading="loading" @click="validate"
            >Se connecter
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-container>
  </v-card>
  <div v-if="errorMessage">
    <ErrorAlert :errorMessage="errorMessage" />
  </div>
</template>
