<!-- src/layouts/components/NavigationMenu.vue -->
<template>
  <!-- Use um v-list com nav e density para ter a estrutura de menu -->
  <v-list nav density="compact" v-model:opened="open">
    <!-- Grupo principal "Users" -->
    <v-list-group value="Users">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" prepend-icon="mdi-account-circle" title="Users" />
      </template>

      <!-- Grupo Admin (subgrupo) -->
      <v-list-group value="Admin">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Admin" />
        </template>
        <v-list-item v-for="([title, icon], i) in admins" :key="'admin-' + i" :prepend-icon="icon" :title="title"
          :value="title" />
      </v-list-group>

      <!-- Grupo Actions (subgrupo) -->
      <v-list-group value="Actions">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Actions" />
        </template>
        <v-list-item v-for="([title, icon], i) in cruds" :key="'action-' + i" :prepend-icon="icon" :title="title"
          :value="title" />
      </v-list-group>
    </v-list-group>
  </v-list>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'NavigationMenu',
  setup() {
    // Controle quais grupos estarão abertos; por padrão, iniciamos com "Users" aberto
    const open = ref(['Users'])

    // Dados para o grupo "Admin"
    const admins = [
      ['Gerenciamento', 'mdi-account-multiple-outline'],
      ['Configuração', 'mdi-cog-outline']
    ]
    // Dados para o grupo "Actions"
    const cruds = [
      ['Create', 'mdi-plus-outline'],
      ['Read', 'mdi-file-outline'],
      ['Update', 'mdi-update'],
      ['Delete', 'mdi-delete']
    ]

    return { open, admins, cruds }
  }
}
</script>
