<template>
  <div class="pokemon-stats">
    <h3>Estatísticas</h3>
    <ul>
      <li v-for="stat in stats" :key="stat.stat.name">
        {{ stat.stat.name }}: {{ stat.base_stat }}
        <div class="stat-bar" :style="{ width: (stat.base_stat / 2.5) + '%' }"></div>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  stats: Array
});
</script>

<style scoped>
.pokemon-stats ul {
  list-style: none;
  padding: 0;
}

.stat-bar {
  height: 8px;
  background-color: #4caf50;
  margin: 2px 0 4px;
}
</style>
