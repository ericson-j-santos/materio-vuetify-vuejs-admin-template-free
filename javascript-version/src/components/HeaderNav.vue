<!-- src/components/HeaderNav.vue -->
<template>
  <header>
    <v-nav>
      <router-link :to="{ name: 'PokemonDetails', params: { name: 'pikachu' } }">Home</router-link>
      <router-link v-if="userStore.currentUser && userStore.currentUser.role === 'admin'"
        :to="{ name: 'ManageScopes' }">
        Gerenciar Escopos
      </router-link>
    </v-nav>
  </header>
</template>

<script setup>
import { useUserStore } from '@/store/Usuario/usuarioStore';
const userStore = useUserStore();

// Se o usuario logado for admin, busca a lista de usuarios para gerenciamento
if (userStore.currentUser && userStore.currentUser.role == 'admin') {
  userStore.fetchAllUsers()
}
</script>

<style scoped>
nav {
  background: #eee;
  padding: 10px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #000;
}

nav a.router-link-active {
  font-weight: bold;
}
</style>
