<template>
  <div class="popup" v-click-outside="close">
    <div class="card">
      <div class="card__head">
        <dashboard-tabs  v-model="action" :items="items"></dashboard-tabs>
      </div>
      <div class="card__body" v-if="action == items[0].value">
        <div>
          <input type="text" v-model="searchString" />
        </div>
        <div
          class="tag"
          v-for="tag in searchedTags"
          :key="tag.name"
          :style="{ 'background-color': tag.color }"
        >
          {{ tag.name }}
        </div>
      </div>
      <div class="card__body" v-if="action == items[1].value"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { computed, Ref } from 'vue';
import { Tag } from '../../models';
import { useStore } from '../../store';
import DashboardTabs from '../Common/DashboardTabs.vue';
//common
const items: Tab[] = [
  {
    name: 'Search',
    value: 0
  },
  {
    name: 'Create',
    value: 1
  }
]
const emits = defineEmits(['close'])
const action: Ref<number> = ref(0);
const store = useStore();
const close = () => {
  emits('close');
}
//search
const searchString: Ref<string> = ref('');
const tags: Ref<Tag[]> = ref(store.state.tags.myTags);
const searchedTags = computed(()=>{
  if(!searchString.value)
    return tags.value
  return tags.value.filter(x=>x.name.toString().toLowerCase().includes(searchString.value.toLowerCase()));
})
//create

</script>

<style scoped>

</style>