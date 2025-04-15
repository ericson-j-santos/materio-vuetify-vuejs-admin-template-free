<!-- src/layouts/components/AppFooter.vue -->
<template>
  <v-footer app height="64px" class="barBg">
    <v-spacer></v-spacer>
    <span class="text-body-2 text-light-white-darken-2">
      <strong>SIGLA</strong> - SIGLA Empresa de X - {{ appVersion }}
    </span>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {
    appVersion: {
      type: String,
      default: ''
    }
  }
}
</script>
