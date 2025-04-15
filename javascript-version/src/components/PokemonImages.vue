<template>
  <div class="pokemon-images">
    <h3>Imagens</h3>
    <img v-if="sprites && sprites.front_default" :src="sprites.front_default" alt="Imagem Frontal" />
    <img v-if="sprites && sprites.back_default" :src="sprites.back_default" alt="Imagem Traseira" />
  </div>
</template>

<script setup>
defineProps({
  sprites: Object,
  default: {
    type: Object,
    default: () => ({
    })
    // default: () => ({
    //   front_default: '',
    //   back_default: ''
    // })
  }
});
</script>

<style scoped>
.pokemon-images img {
  max-width: 120px;
  margin: 0 10px;
}
</style>
