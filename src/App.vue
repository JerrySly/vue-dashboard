<script setup lang="ts">
import { getUser } from "./database/users";
import TheHeader from "./components/TheHeader.vue";
  getUser('eugeale');
</script>

<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<style scoped>
</style>
