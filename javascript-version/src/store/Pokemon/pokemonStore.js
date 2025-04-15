// src/store/Pokemon/pokemonStore.js
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import axios from 'axios'
import { mapPokemonFull } from '@/helpers/mappers/pokemon/full'

export const usePokemonStore = defineStore('pokemon', {
    state: () => ({
        // Dados organizados em escopos: habilidades, estatísticas, imagens e movimentos
        pokemon: useStorage('pokemon', null),
        carregando: false,
        erro: null
    }),
    getters: {
        temDados: (state) => !!state.pokemon
    },
    actions: {
        // Método para buscar dados do Pokémon na PokeAPI
        // O parâmetro 'identifier' pode ser o nome ou o ID do Pokémon
        // Exemplo de uso: this.fetchPokemon('pikachu') ou this.fetchPokemon(25)
        async fetchPokemon(identifier) {
            this.carregando = true;
            this.erro = null;
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
                if (!res.data) throw new Error('Pokemon não encontrado');
                // Preenche o estado com os dados da resposta da PokeAPI
                // this.pokemon = {
                //     name: res.data.name,
                //     id: res.data.id,
                //     abilities: res.data.abilities,
                //     stats: res.data.stats,
                //     moves: res.data.moves,
                //     sprites: res.data.sprites
                // };
                this.pokemon = mapPokemonFull(res.data)

                console.log("Pokemon mapeado:", this.pokemon)

            } catch (err) {
                this.erro = err.message || 'Falha ao carregar';
                console.error("Erro:", this.erro);
            } finally {
                this.carregando = false;
            }
        },
        limparDados() {
            this.pokemon = null;
            this.erro = null;
        }
    }
});

// async buscarEscoposPokemon(id = 132) {
//     try {
//         const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
//         const dadosOrganizados = construirEscoposPokemon(data)
//         console.log("Dados organizados:", dadosOrganizados)
//         this.pokemon = dadosOrganizados
//     } catch (erro) {
//         console.error("Erro ao buscar dados do Pokémon:", erro)
//     }
// }
// }
// })

// Função para organizar os dados em "escopos" personalizados
// function construirEscoposPokemon(dadosPokemon) {
//     const escopos = {
//         // Nome do Pokémon
//         nome: dadosPokemon.name,
//         // Habilidades
//         habilidades: [],
//         // Estatísticas
//         estatisticas: [],
//         // Imagens (sprites)
//         imagens: {},
//         // Movimentos
//         movimentos: []
//     }

//     // Escopo: Habilidades
//     if (dadosPokemon.abilities) {
//         dadosPokemon.abilities.forEach(item => {
//             escopos.habilidades.push({
//                 nome: item.ability.name,
//                 url: item.ability.url,
//                 oculto: item.is_hidden,
//                 slot: item.slot
//             })
//         })
//     }

//     // Escopo: Estatísticas
//     if (dadosPokemon.stats) {
//         dadosPokemon.stats.forEach(item => {
//             escopos.estatisticas.push({
//                 nome: item.stat.name,
//                 valorBase: item.base_stat,
//                 esforco: item.effort
//             })
//         })
//     }

//     // Escopo: Imagens – exemplo básico com frontal e traseiro
//     if (dadosPokemon.sprites) {
//         escopos.imagens.frente = dadosPokemon.sprites.front_default
//         escopos.imagens.traseira = dadosPokemon.sprites.back_default
//     }

//     // Escopo: Movimentos – apenas os nomes dos movimentos
//     if (dadosPokemon.moves) {
//         dadosPokemon.moves.forEach(item => {
//             escopos.movimentos.push(item.move.name)
//         })
//     }

//     return escopos
// }
