<template>
  <div class="project">
    <div class="project__header">
      {{props.project.name}}
    </div>
    <div class="project__body">
      <div></div>
    </div>
    <div class="project__actions"></div>
  </div>
</template>

<script setup lang="ts">
import { Project } from "../../models";

const props = defineProps<{
    project:Project
}>()
</script>

<style scoped>

</style>