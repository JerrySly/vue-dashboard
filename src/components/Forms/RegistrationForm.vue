<template>
   <div class="card">
    <div class="card__head">
      <p class="card__title">SingUp</p>
    </div>
    <div class="card__body">
      <input type="login" v-model="login" placeholder="Login" class="input card__input card__input_size-m" />
      <input type="login" v-model="name" placeholder="Your nickname" class="input card__input card__input_size-m" />
      <input type="password" placeholder="Password" v-model="password" class="input card__input card__input_size-m" />
      <input type="password" v-model="confirmPassword" placeholder="Confirm password" class="input card__input card__input_size-m" />
    </div>
    <div class="card__actions">
      <button class="btn card__btn btn_additional" @click="back">Back</button>
      <button class="btn card__btn btn_success" @click="singUp">SingUp</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { Ref } from "vue";
import { useStore } from "../../store";
import { UserActionsTypes } from "../../store/modules/user/actions-types";

const login: Ref<string> = ref("");
const name: Ref<string> = ref("");
const password: Ref<string> = ref("");
const confirmPassword: Ref<string> = ref("");

const store = useStore();
const emits = defineEmits(["toLogin"])

const singUp = async () => {
   await store.dispatch<UserActionsTypes.CREATE_USER>(UserActionsTypes.CREATE_USER,{
    login:login.value,
    password:password.value,
    name: name.value})
}
const back = () => {
    emits("toLogin");
}
</script>

<style>

</style>