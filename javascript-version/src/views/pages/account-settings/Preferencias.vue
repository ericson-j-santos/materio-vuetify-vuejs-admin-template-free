<!-- src/views/pages/account-settings/Preferencias.vue -->
<template>
  <v-container>
    <v-card>
      <v-card-title>Preferência da Página Inicial</v-card-title>
      <v-card-text>
        <v-form>
          <v-select v-model="preferenciaSelecionada" :items="opcoesPaginaInicial" item-title="text" item-value="value"
            label="Selecione a sua página inicial"></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="salvarPreferencia">Salvar</v-btn>
      </v-card-actions>
    </v-card>

    <!-- GlobalSnackbar para feedback -->
    <GlobalSnackbar v-if="app.__snackbar && app.__textoSnackbar" v-model="app.__snackbar" :message="app.__textoSnackbar"
      :variant="app.snackbarVariant" :actionLabel="app.snackActionLabel" @action="handleSnackbarAction" />

  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '@/store/Usuario/usuarioStore';
import { appStore } from '@/store/app';
import { router } from '@/plugins/router'

const usuarioStore = useUserStore();
const app = appStore()

const preferenciaSelecionada = useStorage('preferencia_pagina_inicial', '/dashboard');

// Computed que gera as opções com base nas rotas definidas com meta.exibirPreferencia = true
const opcoesPaginaInicial = computed(() => {
  return router.getRoutes()
    .filter(route => route.meta && route.meta.exibirPreferencia)
    .map(route => ({
      text: route.meta.label || route.path,
      value: route.path
    }))
})

// Opções disponíveis para a página inicial
// const opcoesPaginaInicial = [
//   { text: 'Dashboard', value: 'dashboard' },
//   { text: 'Análise Diária', value: 'analise-diaria' },
//   { text: 'Relatórios', value: 'relatorios' }
// ];

// Ao montar, atribui a preferenca ja reativa da store a variavel local
onMounted(() => {
  // Reseta o snackbar para que nao haja mensagem residual ao entrar na pagina
  app.__snackbar = false
  app.__textoSnackbar = ''

  preferenciaSelecionada.value = usuarioStore.preferenciaPaginaInicial || '/dashboard';
  console.log('[Preferencias] preferencia carregada: ', preferenciaSelecionada.value)
});

// Ao salvar a preferência, atualiza a store (que utiliza useStorage para sincronizar com localStorage)
// e dispara a notificação global.
const salvarPreferencia = () => {
  if (typeof usuarioStore.definirPreferencia === 'function') {
    usuarioStore.definirPreferencia(preferenciaSelecionada.value);
    app.notificar("Preferência atualizada com sucesso!", "success");
    console.log('[Preferencias] Preferência salva:', preferenciaSelecionada.value);
  } else {
    console.error("definirPreferencia não está definida na store");
  }
};

// Callback para ação do snackbar, se necessário
function handleSnackbarAction() {
  // Exemplo: apenas fecha o snackbar
  app.__snackbar = false
}
</script>
