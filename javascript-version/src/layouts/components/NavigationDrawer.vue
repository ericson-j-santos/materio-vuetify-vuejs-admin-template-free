<!-- src/layouts/components/NavigationDrawer.vue -->
<template>
  <v-navigation-drawer temporary v-model="drawer">
    <!-- Cabeçalho com informações da Empresa -->
    <v-list-item title="Empresa" subtitle="Empresa X">
      <small class="opaco">versão: {{ appVersion }}</small>
    </v-list-item>
    <v-divider></v-divider>

    <!-- Menu Principal (itens que não possuem grupos) -->
    <v-list nav density="compact">
      <v-list-item prepend-icon="mdi-home" title="Início" :to="{ path: '/home' }" />
      <v-list-item prepend-icon="mdi-monitor-dashboard" title="Dashboard" :to="{ path: '/paineis' }" />
      <v-list-item prepend-icon="mdi-note-search-outline" title="Consultar demandas" :to="{ path: '/demandas' }"
        color="primary" rounded="xl" />
    </v-list>

    <!-- Importa o componente do menu com grupos expansíveis -->
    <NavigationMenu />

    <!-- Outras opções do menu -->
    <v-list nav density="compact">
      <v-divider></v-divider>
      <v-list-item prepend-icon="mdi-file-sign" title="Fila R" :to="{ path: '/retencao/fila' }" color="primary"
        rounded="xl" />
    </v-list>
    <v-list nav density="compact">
      <v-divider></v-divider>
      <v-list-item prepend-icon="mdi-note-search" title="Incluir propostas" :to="{ path: '/propostas/cadastrar' }"
        color="primary" rounded="xl" />
      <v-list-item prepend-icon="mdi-note-search" title="Consultar propostas" :to="{ path: '/propostas' }"
        color="primary" rounded="xl" />
    </v-list>
    <v-list nav density="compact">
      <v-divider></v-divider>
      <v-list-item prepend-icon="mdi-chart-bar" title="Relatórios" :to="{ path: '/relatorios' }" color="primary"
        rounded="xl" />
      <v-list-item prepend-icon="mdi-robot-industrial-outline" title="Rotinas" :to="{ path: '/rotinas' }"
        color="primary" rounded="xl" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { ref, watch } from 'vue'
import NavigationMenu from './NavigationMenu.vue'

export default {
  name: 'NavigationDrawer',
  components: {
    NavigationMenu
  },
  props: {
    appVersion: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const drawer = ref(props.modelValue)

    // Sincroniza a propriedade local 'drawer' com o componente pai
    watch(drawer, (val) => {
      emit('update:modelValue', val)
    })

    return { drawer }
  }
}
</script>
