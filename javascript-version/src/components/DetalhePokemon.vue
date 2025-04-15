<!-- src/components/DetalhePokemon.vue -->
<template>
  <pre>{{ JSON.stringify(usuarioStore, null, 2) }}</pre>
  <pre>{{ JSON.stringify(usuarioStore.escoposPermitidos, null, 2) }}</pre>

  <div v-if="pokemonStore.pokemon">
    <h2>{{ nomePokemon }}</h2>

    <!-- Seção: Habilidades -->
    <section v-if="usuarioStore.escoposPermitidos && usuarioStore.escoposPermitidos.includes('habilidades')">
      <h3>Habilidades</h3>
      <ul>
        <li v-for="habilidade in pokemonStore.pokemon.habilidades" :key="habilidade.nome">
          {{ habilidade.nome }} (Slot: {{ habilidade.slot }})
        </li>
      </ul>
    </section>

    <!-- Seção: Estatísticas -->
    <section v-if="usuarioStore.escoposPermitidos && usuarioStore.escoposPermitidos.includes('estatisticas')">
      <h3>Estatísticas</h3>
      <ul>
        <li v-for="estatistica in pokemonStore.pokemon.estatisticas" :key="estatistica.nome">
          {{ estatistica.nome }}: {{ estatistica.valorBase }} (Esforço: {{ estatistica.esforco }})
        </li>
      </ul>
    </section>

    <!-- Seção: Imagens -->
    <section v-if="usuarioStore.escoposPermitidos && usuarioStore.escoposPermitidos.includes('imagens')">
      <h3>Imagens</h3>
      <img :src="pokemonStore.pokemon.imagens.frente" alt="Imagem Frontal" />
      <img :src="pokemonStore.pokemon.imagens.traseira" alt="Imagem Traseira" />
    </section>

    <!-- Seção: Movimentos -->
    <section v-if="usuarioStore.escoposPermitidos && usuarioStore.escoposPermitidos.includes('movimentos')">
      <h3>Movimentos (exibindo os 10 primeiros)</h3>
      <ul>
        <li v-for="movimento in pokemonStore.pokemon.movimentos.slice(0, 10)" :key="movimento">
          {{ movimento }}
        </li>
      </ul>
    </section>
  </div>
  <div v-else>
    Carregando...
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { usePokemonStore } from '@/store/Pokemon/pokemonStore'
import { useUserStore } from '@/store/Usuario/usuarioStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const pokemonStore = usePokemonStore()
const usuarioStore = useUserStore()

// Ao montar, busca os dados do Pokémon (por exemplo, ID 132)
onMounted(async () => {
  const id = route.params.id || 132
  await pokemonStore.buscarEscoposPokemon(id)
})

// Exibe o nome do Pokémon, vindo do JSON
const nomePokemon = computed(() => pokemonStore.pokemon ? pokemonStore.pokemon.nome : '')
</script>

<style scoped>
section {
  margin-bottom: 1.5rem;
}

img {
  margin-right: 1rem;
  max-width: 120px;
}
</style>
