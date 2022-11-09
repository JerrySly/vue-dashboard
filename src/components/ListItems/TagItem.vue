<template>
  <div
    class="tag"
    :style="{ 'background-color': tag.color, 'color':textColor }"
    :class="{'tags__item_select':props.selected}"
    >
    <div>{{ tag.name }}</div>
    <div v-if="props.removable" class="remove-sign"><icon-minus @click="remove" width="32" height="32" :fill="textColor"></icon-minus></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import { Tag } from "../../models";
import IconMinus from "../Icons/IconMinus.vue"
const props = defineProps<{
    tag:Tag,
    selected: Boolean,
    removable: Boolean
}>()
const emits = defineEmits(['remove','select'])
const textColor = computed(()=>{
    const array = props.tag.color.split(' ').splice(0,3);
    array[0] = array[0].split('(')[1];
    const numberArray = array.map(x=>Number.parseFloat(x))

    for(let item of numberArray)
        if(item>127)
            return "#000"
    return "#fff";
})
const remove = () => {
    emits('remove');
}
</script>

<style>
.tag {
    color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    
}
.remove-sign{
    margin-top: 6px;
    margin-left: 7px;
}
</style>