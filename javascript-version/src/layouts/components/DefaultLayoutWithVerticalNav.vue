<!-- src/layouts/components/DefaultLayoutWithVerticalNav.vue -->
<script setup>
import NavItems from '@/layouts/components/NavItems.vue'
import logo from '@images/logo.svg?raw'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import HeaderNav from '@/components/HeaderNav.vue'; // Nosso componente de header que criamos anteriormente

import { ref, watch } from 'vue'

// Controle de visibilidade e mensagem do snackbar
const snackOpen = ref(false)
const snackMessage = ref('')
const snackVariant = ref('info')  // Pode ser 'info', 'success', 'warning' ou 'danger'
const snackActionLabel = ref('')  // Se necessário, define o rótulo da ação

// Função que notifica o usuário via snackbar (pode ser chamada de qualquer lugar)
// function notificar(mensagem, variant = 'info', actionLabel = '') {
//   console.log('Função notificar() chamada com:', { mensagem, variant, actionLabel })
//   snackMessage.value = mensagem
//   snackVariant.value = variant
//   snackActionLabel.value = actionLabel

//   // Reinicia o estado para forçar reabertura
//   snackOpen.value = true

// console.log('Após notificar -> snackOpen:', snackOpen.value)
// console.log('Após notificar -> snackMessage:', snackMessage.value)
// console.log('Após notificar -> snackVariant:', snackVariant.value)
// }

// Watcher para monitorar alterações em snackOpen
watch(snackOpen, (novoValor, valorAntigo) => {
  console.log(`snackOpen mudou de ${valorAntigo} para {novoValor}`)
})


</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">

      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode - Alternância de navegação vertical no modo de sobreposição -->
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="ri-menu-line" />
        </IconBtn>

        <!-- 👉 pesquisa -->
        <div class="d-flex align-center cursor-pointer" style="user-select: none;">
          <!-- 👉 Botão de gatilho de pesquisa -->
          <IconBtn>
            <VIcon icon="ri-search-line" />
          </IconBtn>

          <HeaderNav />

          <span class="d-none d-md-flex align-center text-disabled">
            <span class="me-3">Search</span>
            <span class="meta-key">&#8984;K</span>
          </span>
        </div>

        <VSpacer />

        <IconBtn href="https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free" target="_blank"
          rel="noopener noreferrer">
          <VIcon icon="ri-github-fill" />
        </IconBtn>

        <IconBtn>
          <VIcon icon="ri-notification-line" />
        </IconBtn>

        <NavbarThemeSwitcher class="me-2" />

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <RouterLink to="/" class="app-logo app-title-wrapper">
        <!-- eslint-disable vue/no-v-html -->
        <div class="d-flex" v-html="logo" />
        <!-- eslint-enable -->

        <h1 class="font-weight-medium leading-normal text-xl text-uppercase">
          Materio
        </h1>
      </RouterLink>

      <IconBtn class="d-block d-lg-none" @click="toggleIsOverlayNavActive(false)">
        <VIcon icon="ri-close-line" />
      </IconBtn>
    </template>

    <template #vertical-nav-content>
      <NavItems />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- Global Snackbar -->
    <GlobalSnackbar v-model="snackOpen" :message="snackMessage" :variant="snackVariant"
      :actionLabel="snackActionLabel" />


    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    text-transform: uppercase;
  }
}
</style>
