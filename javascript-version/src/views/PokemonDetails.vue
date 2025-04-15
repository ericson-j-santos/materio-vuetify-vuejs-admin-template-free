<template>
  <div class="pokemon-details">

    <!-- <pre>pokemonStore.pokemon: {{ pokemonStore.pokemon }}</pre> -->


    <div v-if="pokemonStore.carregando">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p>Carregando...</p>
    </div>

    <div v-else-if="pokemonStore.erro">
      <p class="erro">{{ pokemonStore.erro }}</p>
      <button @click="recarregar">Tentar novamente</button>
    </div>

    <div v-else-if="pokemonStore.pokemon">
      <h2>{{ pokemonStore.pokemon.name }} ( #{{ pokemonStore.pokemon.id }} )</h2>
      <PokemonImages v-if="isAllowed('imagens')" :sprites="pokemonStore.pokemon.sprites" />
      <PokemonStats v-if="isAllowed('estatisticas')" :stats="pokemonStore.pokemon.stats" />
      <PokemonAbilities v-if="isAllowed('habilidades')" :abilities="pokemonStore.pokemon.abilities" />
      <PokemonMoves v-if="isAllowed('moves')" :moves="pokemonStore.pokemon.moves" />
    </div>
    <div v-else>
      <p>Nenhum Pokémon encontrado.</p>
    </div>
    <h1>Detalhes do Pokémon</h1>
    <!-- <pre>pokemonStore.value: {{ pokemonStore.pokemon }}</pre> -->
  </div>

</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '@/store/Pokemon/pokemonStore';
import { useUserStore } from '@/store/Usuario/usuarioStore';
import PokemonImages from '@/components/PokemonImages.vue';
import PokemonStats from '@/components/PokemonStats.vue';
import PokemonAbilities from '@/components/PokemonAbilities.vue';
import PokemonMoves from '@/components/PokemonMoves.vue';

const pokemonStore = usePokemonStore();
const userStore = useUserStore();
const route = useRoute();

onMounted(() => {

  const identifier = route.params.name || 'pikachu';
  pokemonStore.fetchPokemon(identifier);
});

// Função para verificar se o usuário tem permissão para um determinado escopo
const isAllowed = (scope) => {
  return userStore.currentUser.allowedScopes.includes(scope)


  // return userStore.currentUser.role === 'admin' ||
  //   userStore.currentUser.allowedScopes.includes(scope);
};

function recarregar() {
  const identifier = route.params.name || 'pikachu';
  pokemonStore.fetchPokemon(identifier);
}
</script>

<style scoped>
.pokemon-details h2 {
  text-transform: capitalize;
}

.erro {
  color: red;
  font-weight: bold;
}
</style>
