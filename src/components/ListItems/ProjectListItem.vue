<template>
  <div class="item">
    <div class="item__header"></div>
    <div class="item__body"></div>
    <div class="item__actions"></div>
  </div>
</template>

<script setup lang="ts">
import { Project } from "../../models";

const props = defineProps<{
    project:Project
}>()
</script>

<style>

</style>