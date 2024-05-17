<script setup lang="ts">
import { logoutEndpoint } from "@/api/endpoints";
import { refreshToken, logout, getConnectedUser } from "@/api/auth";
import { onMounted, ref, type Ref } from "vue";
import rqt from "@/api/requests";

const username: Ref<null | string> = ref(null);
const isAdmin: Ref<boolean> = ref(false);

const onExit = async () => {
  try {
    await rqt({
      url: logoutEndpoint,
      method: "POST",
      data: {
        refresh_token: JSON.parse(`${refreshToken}`),
      },
      successCallback: () => logout(),
      failureCallback: () => logout(),
    });
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  const user = getConnectedUser();

  if (user) {
    username.value = user.username;
    isAdmin.value = user.roles.includes("ROLE_ADMIN");
  }
});
</script>

<template>
  <v-app-bar color="teal-darken-2" density="compact">
    <template v-slot:prepend>
      <v-chip
        class="ma-2"
        :color="isAdmin ? 'orange' : 'white'"
        prepend-icon="mdi-account-circle"
      >
        {{ username }}
      </v-chip>
    </template>

    <v-app-bar-title>Gestionnaire de bénéficiaires Reconnect</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-exit-to-app" @click="onExit"></v-btn>
    </template>
  </v-app-bar>
</template>
