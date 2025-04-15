<!-- eslint-disable semi -->
<!-- eslint-disable semi -->
<!-- eslint-disable import/no-unresolved -->
<!-- eslint-disable vue/component-name-in-template-casing -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Dashboard de Análise Diária
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="dadosFormatados" :loading="loading" class="elevation-1">
              <template #loading>
                Carregando dados...
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAnaliseDiariaStore } from '@/store/Dashboard/analiseDiariaStore.js'

const analiseDiariaStore = useAnaliseDiariaStore()

onMounted(() => {
  console.log('Componente montado e onMounted executado')
  analiseDiariaStore.analiseDiaria()
})

const headers = [
  { title: 'Unidade SR', value: 'nu_sr' },
  { title: 'Quantidade Total', value: 'qtd_total' },
  { title: 'Valor Total', value: 'vl_total' },
  { title: 'Quantidade Efetivadas', value: 'qtd_efetivadas' },
  { title: 'Valor Efetivadas', value: 'vl_efetivadas' },
  { title: '% Efetivadas', value: 'proporcao_efetivadas' },
  { title: 'Quantidade Liberadas', value: 'qtd_liberadas' },
  { title: 'Valor Liberado', value: 'vl_liberado' },
  { title: '% Liberadas', value: 'proporcao_liberadas' },
]

const dadosFormatados = computed(() => analiseDiariaStore.dadosFormatados)
const loading = computed(() => analiseDiariaStore.loading)
</script>

<style scoped>
/* Estilos específicos para o dashboard */
</style>
