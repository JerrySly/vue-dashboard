
<template>
  <div>
    <input type="text" v-model="search" class="input project-list__input">
    <button @click="createNew" class="btn project-list__btn">Create new</button>
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

<style>

</style>