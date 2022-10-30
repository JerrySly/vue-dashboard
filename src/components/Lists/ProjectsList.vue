<template>
  <div class="project-list">
    <div class="project-list__header">
      <div class="project-list__title">Projects</div>
      <projects-actions-panel
        class="project-list__actions"
        @createOpen="openDialogView = true"
      ></projects-actions-panel>
    </div>
    <div v-if="projects && projects.length > 0">
      <div
        class="project-list__item"
        v-for="project in projects"
        :key="project.id"
      >
        <project-list-item
          @delete="prepareToDelete(project.id)"
          :project="project"
        ></project-list-item>
      </div>
    </div>
    <create-project-dialog
      class="create-project-dialog"
      @create="updateList"
      v-if="openDialogView"
      @close="openDialogView = false"
    ></create-project-dialog>
    <delete-project-dialog
      class="delete-project-dialog"
      @close="openDeleteView = false"
      v-if="openDeleteView"
      @delete="afterDeleteProject"
      :projectId="deletingProject"
    ></delete-project-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "@vue/runtime-core";
import { Ref } from "vue";
import { Project, User } from "../../models";
import { Store, useStore } from "../../store";
import { ProjectsActionTypes } from "../../store/modules/projects/actions-types";
import ProjectListItem from "../ListItems/ProjectListItem.vue";
import CreateProjectDialog from "../Dialogs/CreateProjectDialog.vue";
import ProjectsActionsPanel from "../ActionsPanel/ProjectsActionsPanel.vue";
import DeleteProjectDialog from "../Dialogs/DeleteProjectDialog.vue";
import { state } from "../../store/modules/user/state";

let store: Store = useStore();
let projects: Ref<Array<Project>> = ref([]);
let openDialogView: Ref<Boolean> = ref(false);
let deletingProject: Ref<string> = ref("");
let openDeleteView: Ref<Boolean> = ref(false);
let user = computed(() => {
  return state.user;
});

onMounted(() => {
  store = useStore();
  if (user) updateList();
});

const updateList = async () => {
  await store.dispatch<ProjectsActionTypes.GET_MY_PROJECTS>(
    ProjectsActionTypes.GET_MY_PROJECTS,
    { userId: user.value?.userId as string }
  );
  projects.value = store.state.projects.myProjects;
};
const prepareToDelete = (projectId: string) => {
  deletingProject.value = projectId;
  openDeleteView.value = true;
};
const afterDeleteProject = async () => {
  await updateList();
  openDeleteView.value = false;
}
</script>

<style>
.project-list {
  margin: auto;
  max-width: 600px;
  margin-top: 20px;
}
.project-list__title {
  font-size: 28px;
  font-family: "Noto Sans JP", sans-serif;
  color: green;
  text-align: center;
}
.project-list__actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.create-project-dialog {
  width: 400px;
}
</style>