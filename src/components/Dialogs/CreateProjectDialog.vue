<template>
  <div class="dialog" @click-outside="() => close">
    <div class="dialog-header">
        Create project
    </div>
    <div class="dialog-body">
        <input type="text" class="input dialog-body__input" v-model="name" placeholder="Project name" />
        <textarea class="textarea dialog-body__textarea" cols="30" rows="10" v-model="describe"></textarea>
    </div>
    <div class="dialog-actions"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Ref } from "vue";

let name: Ref<string> = ref("");
let describe: Ref<string> = ref("");

const emits = defineEmits(["close"])

const close = () =>{
  emits('close');
}
</script>

<style>

</style>