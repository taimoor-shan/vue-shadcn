<script setup lang="ts">

</script>

<template>
  <div class="">
  <div class="flex justify-center gap-6 py-5">
    
    <router-link to="/">
      Home
    </router-link>
    <router-link to="/dashboard">
      Dashboard
    </router-link>   
    <router-link to="/email">
      Email
    </router-link>   
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
