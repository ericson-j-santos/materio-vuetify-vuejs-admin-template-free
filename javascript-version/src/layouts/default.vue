<!-- src/layouts/default.vue -->
<script setup>
import DefaultLayoutWithVerticalNav from './components/DefaultLayoutWithVerticalNav.vue'
import Home from './components/default/Home.vue';

</script>

<template>
  <DefaultLayoutWithVerticalNav>
    <!-- <Home> -->
    <RouterView />
    <!-- </Home> -->
  </DefaultLayoutWithVerticalNav>
</template>

<style lang="scss">
// Como estamos usando o plugin `layouts`, precisamos que seus estilos sejam importados
@use "@layouts/styles/default-layout";
</style>
