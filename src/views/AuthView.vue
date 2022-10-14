<template>
  <div class="form form_centered">
    <auth-form v-if="loginState" @to-singup="singUpDialog"></auth-form>
    <registration-form v-if="singUpState" @to-login="loginDialog"></registration-form>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import AuthForm from '../components/Forms/AuthForm.vue';
import RegistrationForm from '../components/Forms/RegistrationForm.vue';
const component = defineComponent({
  components:{
    AuthForm,
    RegistrationForm
  }
})
const loginState:Ref<boolean> = ref(true);
const singUpState:Ref<boolean> = ref(false);

const loginDialog = () => {
  singUpState.value = false;
  loginState.value = true;
}

const singUpDialog = () => {
  singUpState.value = true;
  loginState.value = false;
}

</script>

<style>


</style>