<template>
  <div class="tabs">
    <div class="tabs__item" @click="setValue(tab)" :class="{'tabs__item_selected':modelValue == tab.value}" v-for="tab in props.items" :key="tab.value">
      {{ tab.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "@vue/reactivity";
const props = defineProps<{
  items: Tab[];
}>();
const emits = defineEmits(["update:modelValue"]);
const modelValue: Ref<number> = ref(0);
const setValue = (tab:Tab)=>{
    modelValue.value=tab.value;
    emits('update:modelValue',modelValue.value);
}
</script>

<style scoped>
.tabs{
  display: flex;
  justify-content: space-around;
}
.tabs__item{
  cursor: pointer;
}
.tabs__item:hover{
  color: rgb(128, 198, 128);
}
.tabs__item_selected{
  color:green;
}
</style>