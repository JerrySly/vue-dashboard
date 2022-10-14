<template>
  <div class="card">
    <div class="card__head">
      <p class="card__title">Settings</p>
    </div>
    <div class="card__body">
        <div class="form__item">
            <label class="card__label card__label_covering">
                <input @change="backgroundChange" class="input card__input card__input_size-m card__input_labeled" type="file" accept="image/*"/>
                Choose your background
            </label>
        </div>
        <div class="form__item">
            <input v-model="nickname" placeholder="Nickname" class="input card__input card__input_size-m"  />
        </div>
    </div>
    <div class="card__actions">
        <button class="btn card__btn btn_additional" @click="cancel">Cancel</button>
        <button class="btn card__btn btn_success" @click="save">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "@vue/reactivity";
import { useRouter } from "vue-router"


const router = useRouter();

let nickname: Ref<string> = ref("")

const backgroundChange = (value:Event) => {
    console.log(value)
}
const cancel = () =>{
    router.push({name:"List"})
}
const save = () => {
    router.push({name:"List"})
}
</script>

<style>

</style>