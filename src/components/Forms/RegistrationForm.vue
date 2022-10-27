<template>
  <div class="card card_sing-up">
    <div class="card__head">
      <p class="card__title">SingUp</p>
    </div>
    <div class="card__body">
      <input
        type="login"
        v-model="singUpForm.login"
        placeholder="Login"
        class="input card__input card__input_size-m"
      />
      <div class="error card__error">
        <div
          class="error__message"
          v-for="(error, index) in validator.login.$silentErrors"
          :key="index"
        >
          {{ error.$message }}
        </div>
      </div>
      <input
        type="login"
        v-model="singUpForm.name"
        placeholder="Your nickname"
        class="input card__input card__input_size-m"
      />
      <div class="error card__error">
        <div
          class="error__message"
          v-for="(error, index) in validator.name.$silentErrors"
          :key="index"
        >
          {{ error.$message }}
        </div>
      </div>
      <input
        type="password"
        placeholder="Password"
        v-model="singUpForm.password"
        class="input card__input card__input_size-m"
      />
      <div class="error card__error">
        <div
          class="error__message"
          v-for="(error, index) in validator.password.$silentErrors"
          :key="index"
        >
          {{ error.$message }}
        </div>
      </div>
      <input
        type="password"
        v-model="singUpForm.confirmPassword"
        placeholder="Confirm password"
        class="input card__input card__input_size-m"
      />
      <div class="error card__error">
        <div
          class="error__message"
          v-for="(error, index) in validator.confirmPassword.$silentErrors"
          :key="index"
        >
          {{ error.$message }}
        </div>
      </div>
    </div>
    <div class="card__actions">
      <button class="btn card__btn btn_additional" @click="back">Back</button>
      <button class="btn card__btn btn_success" @click="check">SingUp</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import useVuelidate from "@vuelidate/core";
import { helpers, required, sameAs } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useStore } from "../../store";
import { UserActionsTypes } from "../../store/modules/user/actions-types";
import { state } from "../../store/modules/user/state";
import { password as passwordRule, equal } from "../../vuelidate/customRules";

const store = useStore();
const emits = defineEmits(["toLogin"]);
const router = useRouter();

const singUpForm: {
  login: string;
  name: string;
  password: string;
  confirmPassword: string;
} = reactive({
  login: "",
  name: "",
  password: "",
  confirmPassword: "",
});

const formRules = computed(() => {
  return {
    login: { required },
    name: { required },
    password: {
      required,
      passwordRule: helpers.withMessage(
        "Password must contain one uppercase symbol, one lowercase symbol, one special symbol and one number",
        passwordRule
      ),
    },
    confirmPassword: { required, sameAs:sameAs(singUpForm.password)  },
  };
});
const user = computed(()=>{
  return state.user;
})
const validator = useVuelidate(formRules, singUpForm);
const singUp = async () => {
  if (await validator.value.$validate()){
    await store.dispatch<UserActionsTypes.CREATE_USER>(
      UserActionsTypes.CREATE_USER,
      {
        login: singUpForm.login,
        password: singUpForm.password,
        name: singUpForm.name,
      }
    );
    if(user)
      router.push({name:'List'})
  }
};
const check = () => {
  console.log(singUpForm.password);
};
const back = () => {
  emits("toLogin");
};
</script>

<style>
</style>