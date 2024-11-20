<template>
  <main
    class="h-screen w-4/5 flex mt-20 lg:mt-0 lg:justify-center items-center flex-col bg-cyan-950"
  >
    <nav-bar></nav-bar>

    <main-content></main-content>
  </main>
</template>

<script setup lang="ts">
import NavBar from "src/components/nav-bar.vue";
import MainContent from "src/components/main-content.vue";
</script>
