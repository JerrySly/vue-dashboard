<script setup lang="ts">
import { getUser } from "./database/users";
import TheHeader from "./components/TheHeader.vue";
import { useStore } from "./store";

const store = useStore();
const user = store.state.user.user;
</script>

<template>
  <the-header v-if="user"></the-header>
  <router-view></router-view>
</template>

<style scoped>
</style>
