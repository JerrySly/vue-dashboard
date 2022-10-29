<template>
  <div class="dialog" v-click-outside="close">
    <div class="dialog__header">
        Create project
    </div>
    <div class="dialog__body">
        <input type="text" class="input dialog__input" v-model="name" placeholder="Project name" />
        <textarea class="textarea dialog__textarea"  placeholder="Description" cols="30" rows="10" v-model="describe"></textarea>
    </div>
    <div class="dialog-actions">
      <button class="btn btn_additional" @click="close"> Cancel </button>
      <button class="btn btn_success" @click="create"> Create </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { emit } from "process";
import { computed, onMounted, Ref } from "vue";
import { User } from "../../models";
import { useStore } from "../../store";
import { ProjectsActionTypes } from "../../store/modules/projects/actions-types";
import { state } from "../../store/modules/user/state";

let name: Ref<string> = ref("");
let describe: Ref<string> = ref("");
let userId:Ref<string> = ref("");


const emits = defineEmits(["close","create"])
const store = useStore();

const user = computed(():User => {
  return store.state.user.user as User;
})
onMounted(()=>{
  if(user.value)
    userId.value = user.value.userId
})

const create = async () => {
  if(userId.value && name.value){
    store.dispatch<ProjectsActionTypes.CREATE_NEW>(ProjectsActionTypes.CREATE_NEW, {
      name:name.value,
      description: describe.value,
      creator: userId.value
    })
    emits('create');
    close();
  }
}
const close = () =>{
  emits('close');
}
</script>

<style scoped>
.dialog__input{
  margin-top: 20px;
  border: 1px solid black;
  font-size: 24px;
  font-family: "Noto Sans JP", sans-serif;
}
.dialog__textarea{
  margin-top: 20px;
  padding-left: 5px;
  font-size: 20px;
  font-family: "Noto Sans JP", sans-serif;
  resize: vertical;
}
.dialog-actions{
  margin-top: 20px;
}

</style>