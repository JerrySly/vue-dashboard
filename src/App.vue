<script setup lang="ts">
import { getUser } from "./database/users";
import TheHeader from "./components/TheHeader.vue";
import { useStore } from "./store";
import ErrorDialog from "./components/Dialogs/ErrorDialog.vue";
import { computed, ref, Ref } from "@vue/runtime-core";
import { SystemMutationTypes } from "./store/modules/system/mutations-types";
import { AppError } from "./models";
import { SystemActionTypes } from "./store/modules/system/actions-types";
const store = useStore();
const user = computed(() => {
  return store.state.user.user;
});
const error = computed(() => {
  return store.state.system.error;
});
const clearError = () => {
  store.dispatch<SystemActionTypes.SET_ERROR>(SystemActionTypes.SET_ERROR,null);
}
console.log(store)
</script>

<template>
  <the-header v-if="user"></the-header>
  <router-view></router-view>
  <error-dialog v-click-outside="clearError"  :error="error" v-if="error"></error-dialog>
</template>

<style scoped>
</style>
