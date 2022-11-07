<template>
  <div class="popup" v-click-outside="close">
    <div class="card">
      <div class="card__head">
        <dashboard-tabs v-model="action" :items="items"></dashboard-tabs>
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
      <div class="card__body" v-if="action == items[1].value">
        <input placeholder="Name for create" type="text" v-model="form.name" />
        <color-picker
          default-format="rgb"
          :color="color"
          @color-change="updateColor"
        ></color-picker>
        <div class="error card__error">
          <div
            class="error__message"
            v-for="(error, index) in validator.name.$silentErrors"
            :key="index"
          >
            {{ error.$message }}
          </div>
        </div>
        <div class="card__actions">
          <button class="card__btn" @click="createTag">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { computed, Ref } from "vue";
import { Tag } from "../../models";
import { useStore } from "../../store";
import DashboardTabs from "../Common/DashboardTabs.vue";
import { ColorPicker } from "vue-accessible-color-picker";
import { helpers, required } from "@vuelidate/validators";
import { existed } from "../../vuelidate/customRules";
import useVuelidate from "@vuelidate/core";
import { TagActionTypes } from "../../store/modules/tags/actions-types";
//common
const items: Tab[] = [
  {
    name: "Search",
    value: 0,
  },
  {
    name: "Create",
    value: 1,
  },
];
const emits = defineEmits(["close","create"]);
const action: Ref<number> = ref(0);
const store = useStore();
const close = () => {
  emits("close");
};
//search
const searchString: Ref<string> = ref("");
const tags: Ref<Tag[]> = ref(store.state.tags.myTags);
const searchedTags = computed(() => {
  if (!searchString.value) return tags.value;
  return tags.value.filter((x) =>
    x.name.toString().toLowerCase().includes(searchString.value.toLowerCase())
  );
});
//create
const formRules = computed(() => {
  return {
    name: {
      required: helpers.withMessage("Name is required", required),
      isExisted: helpers.withMessage(
        "Tag with this name already exist",
        existed(
          tags.value.filter((x) => x.type == 'project').map((x) => x.name)
        )
      ),
    },
  };
});
const form: {
  name: string;
} = reactive({
  name: "",
});
const validator = useVuelidate(formRules, form);
const color: Ref<string> = ref("#fff");
const updateColor = (eventData) => {  
    color.value = eventData.cssColor;
};
const createTag = async () => {
  if (await validator.value.$validate()) {
    emits('create',{
      name:form.name,
      color: color.value
    })
    emits('close')
  }
};
</script>

<style scoped>
.popup {
  min-width: 220px;
}
.card__body input {
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 4px;
}
.card__actions button{
  height: 40px;
  width: 120px;
  background-color: rgb(2, 187, 2);
  font-size: 18px;
  color:white
}
.card__actions button:hover{
  background-color: rgb(1, 128, 1);
}
</style>