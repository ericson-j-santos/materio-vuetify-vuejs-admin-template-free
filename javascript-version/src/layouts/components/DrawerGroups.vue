<!-- src/layouts/components/DrawerGroups.vue -->
<template>
  <v-list v-model="open" nav density="compact">
    <!-- Grupo principal: Users -->
    <v-list-group value="Users">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" prepend-icon="mdi-account-circle" title="Users" />
      </template>

      <!-- Grupo Admin -->
      <v-list-group value="Admin">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Admin" />
        </template>
        <v-list-item v-for="([title, icon], i) in admins" :key="'admin-' + i" :prepend-icon="icon" :title="title"
          :value="title" />
      </v-list-group>

      <!-- Grupo Actions -->
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
  name: 'DrawerGroups',
  setup() {
    // Inicialmente, abre o grupo "Users"
    const open = ref(['Users'])

    const admins = [
      ['Gerenciamento', 'mdi-account-multiple-outline'],
      ['Configuração', 'mdi-cog-outline']
    ]
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
