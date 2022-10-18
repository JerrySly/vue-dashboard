<template>
  <div class="card card_auth">
    <div class="card__head">
      <p class="card__title">LogIn</p>
    </div>
    <div class="card__body">
      <input
        type="login"
        v-model="form.login"
        placeholder="Login"
        class="input card__input card__input_size-m"
      />
      <div class="error card__error">
        <div class="error__message" v-for="(error,index) in validator.login.$silentErrors" :key="index">
          {{error.$message}}
        </div>
      </div>
      <input
        type="password"
        v-model="form.password"
        placeholder="Password"
        class="input card__input card__input_size-m"
      />
      <div class="error card__error">
        <div class="error__message" v-for="(error,index) in validator.password.$silentErrors" :key="index">
          {{error.$message}}
        </div>
      </div>
    </div>
    
    <div class="card__actions">
      <button class="btn card__btn btn_additional" @click="toSingup">
        SingUp
      </button>
      <button class="btn card__btn btn_success" @click="logIn">Login</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, Ref, ref } from "@vue/reactivity";
import { useStore } from "../../store";
import { UserActionsTypes } from "../../store/modules/user/actions-types";
import { useVuelidate } from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { password as passwordRule } from "../../vuelidate/customRules";
const emits = defineEmits(["toSingup"]);

const store = useStore();

const form: { login: string; password: string } = reactive({
  login: "",
  password: "",
});

const formRules = {
  login: { required: helpers.withMessage("Login is required", required) },
  password: {
    required: helpers.withMessage("Password is required", required),
    passwordRule: helpers.withMessage(
      "Password must contain one uppercase symbol, one lowercase symbol, one special symbol and one number",
      passwordRule
    ),
  },
};
const validator = useVuelidate(formRules,form);
const logIn = async () => {
  const validValue = validator.value;
  if(validValue.$errors.length<1 && validValue.$silentErrors.length<1)
    await store.dispatch<UserActionsTypes.GET_USER>(UserActionsTypes.GET_USER, {
      login: form.login,
      password: form.password,
    });
};
const toSingup = () => {
  emits("toSingup");
};
</script>

<style>
</style>