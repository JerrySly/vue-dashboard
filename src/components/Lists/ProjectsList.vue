<template>
  <div class="project-list">
    <div class="project-list__header">
      <div class="project-list__title">Projects</div>
      <projects-actions-panel class="project-list__actions" @create-open="openCreateDialog"></projects-actions-panel>
    </div>
    <div v-if="projects && projects.length>0">
      <div class="project-list__item" v-for="project in projects" :key="project.id">
        <project-list-item :project="project"></project-list-item>
      </div>
    </div>
    <create-project-dialog class="create-project-dialog"  v-if="openDialogView" @close="closeCreateDialog"></create-project-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from '@vue/runtime-core';
import { Ref } from 'vue';
import { Project, User } from '../../models';
import { Store, useStore } from '../../store';
import { ProjectsActionTypes } from '../../store/modules/projects/actions-types';
import ProjectListItem  from '../ListItems/ProjectListItem.vue';
import CreateProjectDialog from '../Dialogs/CreateProjectDialog.vue';
import ProjectsActionsPanel from '../ActionsPanel/ProjectsActionsPanel.vue';
import { state } from '../../store/modules/user/state';

let store:Store;
let projects: Ref<Array<Project>>;
let openDialogView: Ref<boolean> = ref(false);

let user = computed(()=>{
  return state.user;
})

onMounted(() => {
  store = useStore();
  if(user){
    store.dispatch<ProjectsActionTypes.GET_MY_PROJECTS>(ProjectsActionTypes.GET_MY_PROJECTS, {userId:user.value?.userId as string});
    projects.value = store.state.projects.myProjects;
  }
})

const openCreateDialog = () => {
  openDialogView.value = true;
}

const closeCreateDialog = () => {
  openDialogView.value = false;
}
</script>

<style>
.project-list{
  margin:auto;
  max-width: 600px;
  margin-top: 20px;
}
.project-list__title{
  font-size: 28px;
  font-family: "Noto Sans JP", sans-serif;
  color: green;
  text-align: center;
}
.project-list__actions{
  display: flex;
  justify-content: space-between;
  margin-top:20px;
}
.create-project-dialog{
  width: 400px;
}
</style>