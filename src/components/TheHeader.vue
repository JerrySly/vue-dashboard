<template>
  <header class="header">
    <div class="header__nav">
      <div class="header__action">
        <icon-list></icon-list>
      </div>
      <div class="header__action">
        <icon-person></icon-person>
      </div>
      <div class="header__action">
        <icon-friends></icon-friends>
      </div>
      <div class="header__action">
        <icon-cog></icon-cog>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { defineComponent } from "@vue/runtime-core";
import IconCog from "./Icons/IconCog.vue";
import IconFriends from "./Icons/IconFriends.vue";
import IconList from "./Icons/IconList.vue";
import IconPerson from "./Icons/IconPerson.vue";
const component = defineComponent({
  components: {
    IconCog,
    IconFriends,
    IconList,
    IconPerson,
  },
});
</script>

<style>
.header__action {
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
.header__action:hover{
  background-color: rgba(0, 128, 0, 0.377);
  border-radius: 50%; 
}
.header__nav{
  max-width: 500px;
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>