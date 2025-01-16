<template>
  <NavigationBar />
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue';
</script>

<style>
.app-container {
  padding-top: 64px;
  min-height: 100vh;
  background-color: var(--background-color);
}
</style>
