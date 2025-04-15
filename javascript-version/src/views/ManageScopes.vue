<template>
  <v-container class="pa-4">
    <!-- O trecho de código abaixo se torna redundante, pois o tratamento ocorre via guard na rota assim como mensagem de informacao de erro ao usuario, foi deixado apenas para exemplo -->
    <!-- <div v-if="!isAdmin">
      <v-alert type="error">
        Acesso negado. Somente administradores podem visualizar esta página.
      </v-alert>
    </div> -->
    <v-card>
      <v-card-title>
        Gerenciar Escopos
      </v-card-title>
      <v-card-text>
        <!-- Exibe loader enquanto a requisição está em andamento -->
        <div v-if="userStore.loading">
          <v-progress-circular indeterminate color="primary" />
        </div>
        <!-- Exibe uma mensagem caso nenhum usuário esteja disponível -->
        <div v-else-if="!userStore.currentUser.id">
          <p>Nenhum usuário disponível.</p>
        </div>
        <!-- Exibe os dados do usuário atual -->
        <div v-else>
          <!-- Seleção do usuário usando v-select -->
          <v-select v-model="selectedUserId" :items="userOptions" item-text="display" item-value="id"
            label="Selecione um usuário" dense outlined />

          <pre style="background: #f0f0f0; padding: 16px;">
              selectedUserId: {{ selectedUserId }}
              selectedUser: {{ selectedUser }}
          </pre>

          <div v-if="selectedUser">
            <h3>{{ selectedUser.name }}</h3>
            <p>Escopos permitidos:</p>
            <!-- Exibe cada escopo como um checkbox do Vuetify -->
            <v-row>
              <v-col v-for="scope in availableScopes" :key="scope" cols="12" sm="6" md="3">
                <v-checkbox :label="scope" :model-value="selectedUser.allowedScopes.includes(scope)"
                  @update:model-value="(val) => toggleScope(scope, val)" />
              </v-col>
            </v-row>
            <!-- Botão para salvar as alterações -->
            <v-btn color="primary" @click="saveScopes">Salvar</v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useUserStore } from '@/store/Usuario/usuarioStore';

// A store possui os dados do usuário atual (currentUser) e a lista de todos os usuários (allUsers)
const userStore = useUserStore();

// Computa se o usuário logado tem o papel "admin"
const isAdmin = computed(() => userStore.currentUser.role === 'admin');

// Ref para armazenar o ID do usuário selecionado pelo admin
const selectedUserId = ref(null);

// Lista dos escopos disponíveis
const availableScopes = ['habilidades', 'estatisticas', 'imagens', 'moves'];

// Cria uma propriedade computada para transformar os usuários em opções para o v-select
const userOptions = computed(() => {
  return userStore.allUsers.map(user => ({
    ...user,
    display: `${user.name} (${user.role})`
  }));
});

// Computa o usuário selecionado com base no ID escolhido
const selectedUser = computed(() => {
  return userStore.allUsers.find(u => u.id === selectedUserId.value);
});

// Observa a mudanças no usuario selecionado e cptura os escopos permitidos
watch(selectedUserId, async (newUserId) => {
  if (newUserId) {
    // const user = userStore.allUsers.find(u => u.id === newUserId)
    console.log('Usuário selecionado:', selectedUser.value);
    // Se necessário, você pode fazer uma nova busca dos detalhes do usuário aqui.

  }
})


/**
 * Alterna a permissão de um escopo para o usuário selecionado.
 * Se "allowed" é verdadeiro, adiciona o escopo (se ainda não estiver presente);
 * caso contrário, remove-o.
 */
function toggleScope(scope, allowed) {
  if (!selectedUser.value) return;

  if (allowed) {
    if (!selectedUser.value.allowedScopes.includes(scope)) {
      selectedUser.value.allowedScopes.push(scope);
    }
  } else {
    selectedUser.value.allowedScopes = selectedUser.value.allowedScopes.filter(
      s => s !== scope
    );
  }
}

/**
 * Salva as alterações nos escopos do usuário atual.
 * Simula uma chamada a uma API ou ação de store.
 */
async function saveScopes() {
  if (selectedUser.value) {
    await userStore.updateUserScopes(
      selectedUser.value.id,
      selectedUser.value.allowedScopes
    );
    alert('Escopos atualizados com sucesso!');
  }
}

// Ao montar o componente, busca os dados necessários:
// - Dados do usuário atual para verificar se é admin.
// - Lista de usuários para o admin selecionar.
onMounted(async () => {
  await userStore.capturaEscoposPermitidos()
  if (userStore.allUsers.length === 0) {
    userStore.fetchAllUsers();
  }
});
</script>

<style scoped>
.pa-4 {
  padding: 16px;
}
</style>
