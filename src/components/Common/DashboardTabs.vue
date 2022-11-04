<template>
  <div class="tabs">
    <div class="tabs__item" @click="setValue(tab)" v-for="tab in props.items" :key="tab.value">
      {{ tab.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "@vue/reactivity";
const props = defineProps<{
  items: Tab[];
}>();
const emits = defineEmits(["input"]);
const modelValue: Ref<number> = ref(0);
const setValue = (tab:Tab)=>{
    modelValue.value=tab.value;
    emits('input',modelValue.value);
}
</script>

<style>
</style>