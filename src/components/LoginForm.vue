<script>
import { loginEndpoint } from "@/api/endpoints";
import axios from "axios";
import router from "@/router";
import ErrorAlert from "@/components/ErrorAlert.vue";

export default {
  data: () => ({
    email: {
      value: "",
      rules: [(value) => !!value.length ?? "Un email valide est requis"],
    },
    password: {
      value: "",
      rules: [(value) => !!value.length ?? "Le mot de passe est requis"],
    },
    loading: false,
    user: null,
    errorMessage: null,
  }),
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        this.loading = true;
        try {
          this.user = await axios.post(
            loginEndpoint,
            {
              email: this.email.value,
              password: this.password.value,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          router.push("dashboard");
        } catch (err) {
          this.errorMessage = err.toString();
        } finally {
          this.loading = false;
        }
      } else {
        this.errorMessage = "Merci de remplir tous les champs.";
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
      this.errorMessage = null;
    },
    setEmail(value) {
      this.email.value = value;
    },
    setPassword(value) {
      this.password.value = value;
    },
  },
};
</script>

<template>
  <v-card class="mx-auto text-center" max-width="600">
    <v-container>
      <v-form ref="form">
        <v-text-field
          v-model="email.value"
          :rules="email.rules"
          label="Email"
          @click="resetValidation"
          @onChange="setEmail"
        ></v-text-field>
        <v-text-field
          v-model="password.value"
          :rules="password.rules"
          type="password"
          label="Mot de passe"
          @click="resetValidation"
          @onChange="setPassword"
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
  <ErrorAlert :errorMessage="errorMessage" />
</template>
