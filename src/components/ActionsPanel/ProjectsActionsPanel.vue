
<template>
  <div>
    <input type="text" v-model="search" placeholder="Search" class="input project-list__input">
    <button @click="createNew" class="btn btn_success project-list__btn">Create new</button>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { ref } from "@vue/reactivity";

const emits = defineEmits(['createOpen'])

let search:Ref<string> = ref("") 
const createNew = async () => {
    emits('createOpen');
}
</script>

<style scoped>
.project-list__input{
   font-size: 20px;
}
</style>