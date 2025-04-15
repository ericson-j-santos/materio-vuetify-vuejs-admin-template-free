<template>
  <div class="pokemon-abilities">
    <h3>Habilidades</h3>
    <ul>
      <li v-for="ab in abilities" :key="ab.ability.name">
        {{ ab.ability.name }}
        <span v-if="ab.is_hidden"> (oculta)</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  abilities: Array
});
</script>

<style scoped>
.pokemon-abilities ul {
  list-style: none;
  padding: 0;
}
</style>
