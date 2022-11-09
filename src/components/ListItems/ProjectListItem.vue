<template>
  <div class="project">
    <div class="project__header">
      <div>{{ props.project.name }}</div>
      <div class="action" @click="openDeleteDialog">
        <icon-trash :width="38" :height="38"></icon-trash>
      </div>
    </div>
    <hr />
    <div class="project__body">
      <div>
        {{ props.project.describe }}
      </div>
      <hr />
      <div class="project__tags">
        <div class="project__under-header">Tags</div>
        <div class="tags__list">
          <div class="tags__add">
            <icon-plus
              @click.stop="setTagSelector(true)"
              :width="40"
              :height="40"
            ></icon-plus>
          </div>
          <tag-selector
            v-if="tagSelector"
            @close="setTagSelector(false)"
            @create="createTag"
            @updateTags="updateTags"
            :selected="tags"
          ></tag-selector>
          <template v-if="tags" class="tags__block">
            <tag-item
              class="tags__item"
              v-for="tag in tags.filter((x) => x.type == 'project')"
              :tag="tag"
              :removable="true"
              :selected="false"
              :key="tag.name"
              @remove="remove(tag)"
            ></tag-item>
          </template>
        </div>
      </div>
    </div>

    <div class="project__actions"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { Project, Tag } from "../../models";
import { useStore } from "../../store";
import { ProjectsActionTypes } from "../../store/modules/projects/actions-types";
import IconTrash from "../Icons/IconTrash.vue";
import IconPlus from "../Icons/IconPlus.vue";
import { computed, ref, Ref } from "vue";
import TagSelector from "../PopupViews/TagSelector.vue";
import { TagActionTypes } from "../../store/modules/tags/actions-types";
import { TAG_ACTIONS } from "../../helper/enums";
import TagItem from "./TagItem.vue";
import { updateProject } from "../../services/projectService";
import { projects } from "../../store/modules/projects";
const props = defineProps<{
  project: Project;
}>();

const store = useStore();
const emits = defineEmits(["delete"]);
const tagSelector: Ref<Boolean> = ref(false);
const user = computed(() => store.state.user.user);
onMounted(() => {});

const tags = computed(() => {
  return store.state.tags.myTags.filter(
    (x) => x.type == "project" && x.projectId == props.project.id
  );
});
const openDeleteDialog = (event: MouseEvent) => {
  event.stopPropagation();
  emits("delete");
};
const setTagSelector = (value) => {
  tagSelector.value = value;
};
const createTag = async (tagInfo: { color: string; name: string }) => {
  const tag: Tag = {
    color: tagInfo.color,
    name: tagInfo.name,
    type: "project",
    projectId: props.project.id,
    userId: user.value?.userId as string,
  };
  await store.dispatch(TagActionTypes.CREATE_TAG, { tag });
};
const updateTags = (model: { tag: Tag; action: TAG_ACTIONS }) => {};
const remove = (tag:Tag) => {
  
}
</script>

<style scoped>
.tags__item{
  margin-left: 2px;
  display: flex;
  align-items: center;
  height: 30px;
}
.tags__add {
  cursor: pointer;
}
.tags__list {
  display: flex;
}
.project__under-header {
  font-size: 13px;
}
.project {
  background-color: #fff;
  padding: 8px 10px;
  border-radius: 8px;
  margin-top: 10px;
}
.project__header {
  font-size: 24px;
  display: flex;
  justify-content: space-between;
}
.project__body {
  color: rgb(135, 135, 135);
}
</style>