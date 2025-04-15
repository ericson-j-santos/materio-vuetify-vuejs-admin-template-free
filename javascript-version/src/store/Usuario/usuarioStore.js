// src/store/Usuario/userStore.js 
import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useNotificationStore } from '../notificationStore';
import { useStorage } from '@vueuse/core';

// Configura o axios para o JSON-server
axios.defaults.baseURL = 'http://localhost:3000'

export const useUserStore = defineStore('user', () => {
  // currentUser é carregado do backend e persistido via Pinia; 
  // assim, ele é restaurado mesmo após recarregamentos.
  const currentUser = reactive({
    id: 1,
    name: '',
    role: 'admin',
    allowedScopes: [],
    preferenciaPaginaInicial: ''
  });


  // Usuário atual mockado
  // Cria referências de armazenamento reativo para cada propriedade do usuário,
  // usando chaves únicas e valores padrão.
  // const idStorage = useStorage('user_id', 1);
  // const nameStorage = useStorage('user_name', 'Usuário Administrador');
  // const roleStorage = useStorage('user_role', 'admin');
  // const allowedScopesStorage = useStorage('user_allowed_scopes', ['habilidades', 'estatisticas', 'imagens', 'moves']);

  // O currentUser será composto pelos valores atuais do useStorage.
  // (Observe que, como useStorage retorna refs, aqui estamos extraindo o valor inicial;
  // se for necessário que ele seja reativo e sincronizado, pode ser necessário monitorá-los ou usá-los diretamente.)
  // const currentUser = ref({
  //   id: idStorage.value,
  //   name: nameStorage.value,
  //   role: roleStorage.value,
  //   // Usamos "moves" para movimentos (conforme os componentes abaixo)
  //   allowedScopes: allowedScopesStorage.value
  // });

  // Lista de todos os usuários (para administração)
  const allUsers = ref([]);
  const loading = ref(false);

  // Persistência da preferência de página inicial via vueuse
  const preferenciaPaginaInicial = useStorage('preferencia_pagina_inicial', '/dashboard');

  // Método para atualizar a preferência; o useStorage já sincroniza automaticamente
  async function definirPreferencia(novaPreferencia) {
    if (!novaPreferencia.startsWith('/')) {
      novaPreferencia = '/' + novaPreferencia;
    }
    // Verifica se o currentUser já foi carregado (se o ID não for nulo)
    if (!currentUser.value.id) {
      console.error('[usuarioStore] Erro: currentUser não carregado. Não é possível definir a preferência.');
      useNotificationStore().notify('Falha ao atualizar preferencia.');
      return;
    }
    try {
      // Atualize usando o endpoint correto; se o backend fornece os dados do currentUser via /currentUser, use-o:
      // await axios.put(`/users/${currentUser.value.id}`, { preferenciaPaginaInicial: novaPreferencia });
      await axios.put(`/currentUser`, { preferenciaPaginaInicial: novaPreferencia });
      // Se for necessário atualizar em /users, substitua a linha acima por:
      // await axios.put(`/users/${currentUser.value.id}`, { preferenciaPaginaInicial: novaPreferencia });

      // Atualiza o estado local e o useStorage
      currentUser.value.preferenciaPaginaInicial = novaPreferencia;
      preferenciaPaginaInicial.value = novaPreferencia;
      console.log('[UserStore] Preferência definida:', preferenciaPaginaInicial.value);
    } catch (error) {
      console.error('Erro ao definir preferencia:', error);
      useNotificationStore().notify('Falha ao atualizar preferencia.', 'error');
    }
  }


  // Método para capturar os escopos permitidos do usuário atual
  async function capturaEscoposPermitidos() {
    try {
      // Faz a requisição para a API para obter os escopos permitidos
      const response = await axios.get(`/currentUser`);
      // console.log('[usuarioStore capturaEscoposPermitidos] Escopos permitidos capturados:', response);

      // const data = response.data
      // const data_json = JSON.stringify(response.data)
      // const json_data = JSON.parse(data_json)

      // console.log('[usuarioStore capturaEscoposPermitidos] Escopos permitidos capturados response.data:', data);
      // console.log('[usuarioStore capturaEscoposPermitidos] Escopos permitidos capturados data_json stringify:', data_json);
      // console.log('[usuarioStore capturaEscoposPermitidos] Escopos permitidos capturados json_data parse:', json_data);

      // const d = json_data[0]

      // console.log('[usuarioStore capturaEscoposPermitidos] Escopos permitidos capturados d:', d);


      // console.log('[usuarioStore capturaEscoposPermitidos] Escopos permitidos capturados:', response.data);

      // Atualiza os escopos permitidos no estado do usuário atual
      currentUser.value = response.data;

      // console.log('[usuarioStore] Escopos permitidos capturados:', currentUser.value.allowedScopes);

    } catch (error) {
      console.error('[usuarioStore] Erro ao capturar escopos permitidos:', error);
      useNotificationStore().notify('[usuarioStore] Falha ao capturar escopos permitidos.', 'error');
    }
  }

  // Método para definir os escopos permitidos do usuário atual
  async function definirEscoposPermitidos(escopos) {
    currentUser.value.allowedScopes = escopos;
    try {
      // await axios.put(`/users/${currentUser.value.id}`, { allowedScopes: escopos });
      await axios.put(`/currentUser`, { allowedScopes: escopos });
    } catch (error) {
      console.error('Erro ao definir escopos permitidos:', error);
      useNotificationStore().notify('Falha ao atualizar escopos permitidos.');
    }
    // Se desejarmos, podemos também atualizar o armazenamento local
    // allowedScopesStorage.value = escopos;
  }

  // Getter que verifica se o usuário é administrador
  const isAdmin = computed(() => currentUser.value.role === 'admin');

  // Getter que verifica se o usuário tem permissão para um escopo específico
  const temPermissao = (escopo) =>
    currentUser.value.allowedScopes && currentUser.value.allowedScopes.includes(escopo);

  // Funcao para buscar o usuário atual do backend
  async function fetchCurrentUser() {
    loading.value = true;
    try {
      const response = await axios.get('/currentUser'); // Supondo que o ID do usuário atual seja 1
      currentUser.value = response.data;
      preferenciaPaginaInicial.value = response.data.preferenciaPaginaInicial
    } catch (error) {
      console.error('Erro ao buscar currentUser:', error)
      // Se houver erro, notifica o usuário
      useNotificationStore().notify('Falha ao carregar usuário.', 'error');
    } finally {
      loading.value = false;
    }
  }

  // Ações assíncronas (mockadas) para buscar e atualizar usuários
  async function fetchAllUsers() {
    loading.value = true;
    try {
      // Simula um atraso para teste (pode ser removido em produção)
      await new Promise(resolve => setTimeout(resolve, 500));

      // Realiza a requisição para a API
      const res = await axios.get('/users')
      console.log('res', res)

      // allUsers.value = res.data; // ✅ CORRETO: salva o array de usuários


      //Se a resposta contiver a propriedade "users", usa-a,
      //senão, assume que o próprio res.data é o array de usuários.
      const users = res.data.users || res.data

      // Se precisar somente de alguns campos:
      allUsers.value = users.map(({ id, name, role, allowedScopes }) => ({
        id,
        name,
        role,
        allowedScopes
      }))

      console.log('allUsers', allUsers.value)

      // allUsers.value = [
      //   { id: 1, name: 'Usuário Administrador', role: 'admin', allowedScopes: ['habilidades', 'estatisticas', 'imagens', 'moves'] },
      //   { id: 2, name: 'Usuário Comum', role: 'common', allowedScopes: ['habilidades', 'estatisticas', 'imagens'] }
      // ];
    } catch (e) {
      useNotificationStore().notify('Falha ao carregar usuários.', 'error');
    } finally {
      loading.value = false;
    }
  }

  async function updateUserScopes(userId, newScopes) {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const idx = allUsers.value.findIndex(u => u.id === userId);
      if (idx !== -1) {
        allUsers.value[idx].allowedScopes = [...newScopes];
      }
      if (currentUser.value.id === userId) {
        currentUser.value.allowedScopes = [...newScopes];
      }
      useNotificationStore().notify('Permissões atualizadas com sucesso.', 'success');
    } catch (error) {
      useNotificationStore().notify('Falha ao atualizar permissões.', 'error')
    }
  }


  return {
    currentUser,
    allUsers,
    loading,
    preferenciaPaginaInicial,
    definirPreferencia,
    definirEscoposPermitidos,
    isAdmin,
    temPermissao,
    fetchAllUsers,
    updateUserScopes,
    fetchCurrentUser,
    capturaEscoposPermitidos
  }
});

// persist: {
//   storage: sessionStorage
// }

// {
//   persist: true // Persiste toda a store via o plugin do Pinia
// }


// src/store/usuarioStore.js
// import { defineStore } from 'pinia';
// import { useStorage } from '@vueuse/core';
// import { useNotificationStore } from '@/store/notificationStore.js';

// export const useUserStore = defineStore('user', {
//     state: () => ({
//         // Usuário atual mockado; em produção, isso viria do login
//         currentUser: {
//             id: 1,
//             name: 'Usuário Administrador',
//             role: 'admin',
//             allowedScopes: ['habilidades', 'estatisticas', 'imagens', 'moves']
//         },
//         allUsers: [],
//         loading: false
//     }),
//     getters: {
//         isAdmin: (state) => state.currentUser.role === 'admin',
//         temPermissao: (state) => (escopo) => state.currentUser.allowedScopes.includes(escopo)
//     },
//     actions: {
//         async fetchAllUsers() {
//             this.loading = true;
//             try {
//                 // Simula uma chamada API com delay
//                 await new Promise(resolve => setTimeout(resolve, 500));
//                 this.allUsers = [
//                     { id: 1, name: 'Usuário Administrador', role: 'admin', allowedScopes: ['habilidades', 'estatisticas', 'imagens', 'moves'] },
//                     { id: 2, name: 'Usuário Comum', role: 'common', allowedScopes: ['habilidades', 'estatisticas', 'imagens'] }
//                 ];
//             } catch (e) {
//                 useNotificationStore().notify('Falha ao carregar usuários.', 'error');
//             } finally {
//                 this.loading = false;
//             }
//         },
//         async updateUserScopes(userId, newScopes) {
//             // Simula uma chamada API para atualizar as permissões
//             await new Promise(resolve => setTimeout(resolve, 300));
//             const idx = this.allUsers.findIndex(u => u.id === userId);
//             if (idx !== -1) {
//                 this.allUsers[idx].allowedScopes = [...newScopes];
//             }
//             if (this.currentUser.id === userId) {
//                 this.currentUser.allowedScopes = [...newScopes];
//             }
//             useNotificationStore().notify('Permissões atualizadas com sucesso.', 'success');
//         }
//     },
//     persist: true
// });




// // Armazena a preferencia de pagina inicial do usuario
// // O useStorage sincroniza automaticamente com o localStorage
// // Se não houver valor definido, o valor padrão será '/dashboard'
// // O valor é armazenado como string, então usamos o método 'value' para acessá-lo
// // O valor padrão é '/dashboard', mas pode ser alterado para qualquer outra rota
// // Se o valor não começar com '/', ele será adicionado automaticamente
// // Isso garante que o valor armazenado seja sempre uma rota válida
// const preferenciaPaginaInicial = useStorage('preferencia_pagina_inicial', '/dashboard')

// // Método para atualizar a preferencia (o useStorage ja sicroniza automaticamente)
// function definirPreferencia(novaPreferencia) {
//     if (!novaPreferencia.startsWith('/')) {
//         novaPreferencia = '/' + novaPreferencia
//     }
//     preferenciaPaginaInicial.value = novaPreferencia
//     console.log('[UsuarioStore] Preferencia definida:', preferenciaPaginaInicial.value)
// }

// // Método para definir os escopos permitidos
// function definirEscoposPermitidos(escopos) {
//     escoposPermitidos.value = escopos
// }

// return { preferenciaPaginaInicial, definirPreferencia, definirEscoposPermitidos, escoposPermitidos, id, nome }
// })

