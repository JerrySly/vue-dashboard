<template>
  <div class="card">
    <div class="card__head">
      <p class="card__title">LogIn</p>
    </div>
    <div class="card__body">
      <input type="login" v-model="login" placeholder="Login" class="input card__input card__input_size-m" />
      <input type="password" v-model="password" placeholder="Password" class="input card__input card__input_size-m" />
    </div>
    <div class="card__actions">
      <button class="btn card__btn btn_additional" @click="toSingup">SingUp</button>
      <button class="btn card__btn btn_success" @click="logIn">Login</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from "@vue/reactivity";
import {useStore} from "../../store";
import { UserActionsTypes } from "../../store/modules/user/actions-types";

const emits = defineEmits(["toSingup"])

const store = useStore();

let login:Ref<string> = ref("");
let password: Ref<string> = ref("");

const logIn = async () => {
  await store.dispatch<UserActionsTypes.GET_USER>(UserActionsTypes.GET_USER,
  {
    login:login.value,
    password: password.value
  })
}
const toSingup = () =>{
  emits("toSingup");
}
</script>

<style>

</style>