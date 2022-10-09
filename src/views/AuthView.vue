<template>
  <div class="form form_centered">
    <auth-form></auth-form>
    <registration-form></registration-form>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import AuthForm from '../components/Forms/AuthForm.vue';
import RegistrationForm from '../components/Forms/RegistrationForm.vue';
const component = defineComponent({
  components:{
    AuthForm,
    RegistrationForm
  }
})


</script>

<style>
.form{
  padding-top: 200px;
}
.form_centered{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>