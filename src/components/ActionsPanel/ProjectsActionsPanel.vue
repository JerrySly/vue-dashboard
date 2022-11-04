
<template>
  <div>
    <input type="text" v-model="searchString" placeholder="Search" class="input project-list__input">
    <button @click="search" class="btn btn_success">Search</button>
    <button @click="createNew" class="btn btn_success project-list__btn">Create new</button>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { ref } from "@vue/reactivity";

const emits = defineEmits(['createOpen', 'search'])

let searchString:Ref<string> = ref("") 
const createNew = (event:MouseEvent) => {
  event.stopPropagation();
    emits('createOpen');
}
const search = () =>{
  emits('search',searchString.value)
}
</script>

<style scoped>
.project-list__input{
   font-size: 20px;
}
</style>