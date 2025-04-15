<template>
  <VCard title="Diário">
    <template #subtitle>
      <p class="text-body-1 mb-0">
        <span class="d-inline-block font-weight-medium text-high-emphasis">Total 48.5% Growth</span> <span
          class="text-high-emphasis">😎</span> this month
      </p>
    </template>

    <template #append>
      <MoreBtn :menu-list="moreList" />
    </template>

    <VCardText class="pt-10" v-if="analiseDiariaStore.data">
      <VRow>
        <VCol v-for="item in diario" :key="item.key" cols="12" sm="6" md="3">
          <div class="d-flex align-center gap-x-3">
            <VAvatar :color="item.color" rounded size="40" class="elevation-2">
              <VIcon size="24" :icon="item.icon" />
            </VAvatar>

            <div class="d-flex flex-column">
              <div class="text-body-1">
                {{ item.label }}
              </div>
              <h5 class="text-h5">
                {{ item.value }}
              </h5>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>


<script setup>
import { computed, onMounted, watch } from 'vue'
import { useAnaliseDiariaStore } from '@/store/Dashboard/analiseDiariaStore.js'
import { toolsStore } from '@/services/tools'

const analiseDiariaStore = useAnaliseDiariaStore()
const tools = toolsStore()

onMounted(() => {
  console.log('Componente montado e onMounted executado')
  analiseDiariaStore.capturaAnaliseDiariaData()
})

const dadosFormatados = computed(() => analiseDiariaStore.dadosFormatados)


watch(totalTratados, newValue => {
  console.log('Total Tratados watch:', newValue)
})
watch(dadosFormatados, newValue => {
  console.log('dadosFormatados watch:', newValue)
})


const diario = computed(() => {
  const dados = dadosFormatados.value || []

  console.log('const diario', dados)

  if (!dados.length) return []

  const totalLiberado = dados.reduce((acc, item) => acc + item.valor_liberado, 0)
  // const totalClientes = dados.reduce((acc, item) => acc + (item.quantidade_total || 0), 0)

  const resultado = [
    {
      key: 'Tratados',
      label: 'Tratados',
      value: totalLiberado,
      // value: tools.fmtValorComUnidadeNaoAbs(1250000.75),
      // value: totalLiberado,
      icon: 'ri-pie-chart-2-line',
      color: 'primary',
    },
    {
      key: 'Usuários',
      label: 'Usuários',
      value: tools.fmtValorComUnidadeAbs(1250000.75),
      icon: 'ri-group-line',
      color: 'success',
    },
    {
      key: 'naoRetidos',
      label: 'Não Retidos',
      value: tools.fmtDinheiro(1250000.75),
      icon: 'ri-macbook-line',
      color: 'warning',
    },
    {
      key: 'retidos',
      label: 'Retidos',
      value: totalTratados.value,
      icon: 'ri-money-dollar-circle-line',
      color: 'info',
    },
  ]

  console.log('diario', resultado)

  return resultado
})


const moreList = [
  {
    title: 'Share',
    value: 'Share',
  },
  {
    title: 'Refresh',
    value: 'Refresh',
  },
  {
    title: 'Update',
    value: 'Update',
  },
]
</script>
