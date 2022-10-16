<template>
  <div class="project-list">
    <div class="project-list__header">
      <projects-actions-panel @create-open="openCreateDialog"></projects-actions-panel>
    </div>
    <div v-if="projects && projects.length>0">
      <div class="project-list__item" v-for="project in projects" :key="project.id">
        <project-list-item :project="project"></project-list-item>
      </div>
    </div>
    <create-project-dialog @close="closeCreateDialog"></create-project-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from '@vue/runtime-core';
import { Ref } from 'vue';
import { Project, User } from '../../models';
import { Store, useStore } from '../../store';
import { ProjectsActionTypes } from '../../store/modules/projects/actions-types';
import ProjectListItem  from '../ListItems/ProjectListItem.vue';
import CreateProjectDialog from '../Dialogs/CreateProjectDialog.vue';
import ProjectsActionsPanel from '../ActionsPanel/ProjectsActionsPanel.vue';

let store:Store;
let user:User;
let projects: Ref<Array<Project>>;
let openDialogView: Ref<boolean> = ref(false);

  onMounted(() => {
  store = useStore();
  user = store.state.user.user as User;
  store.dispatch<ProjectsActionTypes.GET_MY_PROJECTS>(ProjectsActionTypes.GET_MY_PROJECTS, {userId:user.userId});
  projects.value = store.state.projects.myProjects;
})

const openCreateDialog = () => {
  openDialogView.value = true;
}

const closeCreateDialog = () => {
  openDialogView.value = false;
}
</script>

<style>

</style>