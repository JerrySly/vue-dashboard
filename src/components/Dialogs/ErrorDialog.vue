<template>
  <div class="dialog error-dialog" >
    <div class="dialog__header">
        App error
    </div>
    <div class="dialog__body">
      <div class="dialog__text">
        {{error.message}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppError } from '../../models';
const props = defineProps<{
  error: AppError
}>()
</script>

<style scoped>
.error-dialog{
  margin-top: 200px;
  max-width: 300px; 
  position: absolute;
  top: 20%;
}
</style>