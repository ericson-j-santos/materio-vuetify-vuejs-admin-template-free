<template>
  <div class="pokemon-moves">
    <h3>Movimentos</h3>
    <ul v-if="limitedMoves.length">
      <li v-for="move in limitedMoves" :key="move.move.name">
        {{ move.move.name }}
      </li>
    </ul>
    <p v-else>Nenhum movimento disponível</p>
    <button v-if="movesDisponiveis && movesDisponiveis > movesLimit && !showAll" @click="showAll = true">
      Ver todos
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  // Garante que a prop moves seja sempre um array (valor padrão: [])
  moves: {
    type: Array,
    default: () => []
  }

  // moves: Array
});

const showAll = ref(false);

const movesLimit = 10;

// Computado que garante que props.moves seja um array antes de usar slice()
const limitedMoves = computed(() => {
  if (!props.moves || !Array.isArray(props.moves)) return [];
  return showAll.value ? props.moves : props.moves.slice(0, movesLimit);
});

// Computado para usar na condição do botão (número total de movimentos)
const movesDisponiveis = computed(() => {
  if (!props.moves || !Array.isArray(props.moves)) return 0;
  return props.moves.length;
});
</script>

<style scoped>
.pokemon-moves ul {
  list-style: none;
  padding: 0;
}
</style>
