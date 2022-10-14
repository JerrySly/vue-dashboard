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
import IconCog from "./Icons/IconCog.vue";
import IconFriends from "./Icons/IconFriends.vue";
import IconList from "./Icons/IconList.vue";
import IconPerson from "./Icons/IconPerson.vue";

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
  background-color: white;
  max-width: 800px;
  min-width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>