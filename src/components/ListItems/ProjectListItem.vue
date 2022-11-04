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
              @click="setTagSelector(true)"
              :width="40"
              :height="40"
            ></icon-plus>
          </div>
          <tag-selector @close="setTagSelector(false)"></tag-selector>
          <template v-if="tags">
            <div
              v-for="tag in tags.filter((x) => x.type == 'project')"
              :key="tag.name"
              :style="{ 'background-color': tag.color }"
            >
              {{ tag.name }}
            </div>
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
import { ref, Ref } from "vue";
import TagSelector from "../PopupViews/TagSelector.vue";
const props = defineProps<{
  project: Project;
}>();

const store = useStore();
const emits = defineEmits(["delete"]);
const tags: Ref<Tag[]> = ref([]);
const tagSelector: Ref<Boolean> = ref(false);
onMounted(() => {});

const openDeleteDialog = (event: MouseEvent) => {
  event.stopPropagation();
  emits("delete");
};
const setTagSelector = (value) => {
  tagSelector.value = value;
};
</script>

<style scoped>
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