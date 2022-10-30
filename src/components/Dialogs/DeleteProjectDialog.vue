<template>
  <div class="dialog" v-click-outside="close">
    <div class="dialog__header">Delete project</div>
    <div class="dialog__body">
      <div class="dialog__text">
        Do you really want delete this project?
      </div>
    </div>
    <div class="dialog-actions">
      <button class="btn btn_additional" @click="close">Cancel</button>
      <button class="btn btn_success" @click="deleteProject">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store';
import { ProjectsActionTypes } from '../../store/modules/projects/actions-types';

const emits = defineEmits(["close","delete"]);
const props = defineProps<{
  projectId: string;
}>();
const store = useStore();

const close = () => {
  emits("close");
};
const deleteProject = () => {
  store.dispatch<ProjectsActionTypes.DELETE_PROJECT>(ProjectsActionTypes.DELETE_PROJECT,{
    projectId: props.projectId
  })
  emits('delete');
};
</script>

<style scoped>
.dialog {
  max-width: 400px;
}
.dialog__body{
  margin-top: 10px;
}
.dialog-actions{
  margin-top: 10px;
}
</style>