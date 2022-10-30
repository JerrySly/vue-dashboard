<template>
  <div class="project">
    <div class="project__header">
      <div>{{props.project.name}}</div>
      <div class="action" @click="openDeleteDialog">
        <icon-trash :width="38" :height="38"></icon-trash>
      </div>
    </div>
    <hr>
    <div class="project__body">
      <div>
        {{props.project.describe}}
      </div>
    </div>
    <div class="project__actions"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { Project } from "../../models";
import { useStore } from "../../store";
import { ProjectsActionTypes } from "../../store/modules/projects/actions-types";
import IconTrash from "../Icons/IconTrash.vue"
const props = defineProps<{
    project:Project
}>()

const store = useStore();
const emits = defineEmits(["delete"])
onMounted(()=>{
  console.log(props.project)
})

const openDeleteDialog = (event:MouseEvent) => {
  event.stopPropagation();
  emits("delete");
}
</script>

<style scoped>
.project{
  background-color: #fff;
  padding: 8px 10px;
  border-radius: 8px;
  margin-top: 10px;
}
.project__header{
  font-size: 24px;
  display: flex;
  justify-content: space-between;
}
.project__body{
  color: rgb(135, 135, 135);
}
</style>