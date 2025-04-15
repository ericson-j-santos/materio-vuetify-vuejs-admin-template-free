<!-- src/layouts/components/AppBar.vue -->
<template>
  <v-app-bar show-arrows :class="{ barBg: !isDark }" class="fixed-bar fixed-tabs-bar">
    <v-progress-linear v-show="loadingLength" color="deep-purple-accent-3" height="60" indeterminate class="loading"
      striped absolute bottom>
      {{ loadingText }}
    </v-progress-linear>
    <template v-slot:prepend>
      <v-app-bar-nav-icon color="white" @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title class="text-white font-weight-medium">{{ title }}</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="toggleTheme">
      <v-icon color="white">mdi-theme-light-dark</v-icon>
    </v-btn>
    <v-menu offset-y width="410">
      <template v-slot:activator="{ props }">
        <div style="cursor: pointer" v-bind="props" overlap offset-x="1" offset-y="25" class="me-3">
          <v-avatar size="40px">
            <v-img cover :src="avatarSrc" alt="User Avatar"></v-img>
          </v-avatar>
          {{ user.matricula }} <br /><small>{{ user.nome }}</small>
        </div>
      </template>
      <v-list>
        <div class="pb-3 pt-2">
          <v-badge overlap offset-x="1" offset-y="30" class="ms-4" dot>
            <v-avatar size="40px">
              <v-img cover :src="avatarSrc" alt="User Avatar"></v-img>
            </v-avatar>
          </v-badge>
          <div class="d-inline-flex flex-column justify-center mx-5"
            style="vertical-align: middle; margin-top: -20px; padding-top: 15px">
            <span class="text--primary font-weight-semibold mb-n1 pb-2">{{ user.nome }}</span>
            <small class="text-medium-emphasis text-capitalize">{{ user.funcao }}</small>
            <small class="text-medium-emphasis text-capitalize">Unid. {{ user.lotacao }}</small>
          </div>
        </div>
        <v-divider></v-divider>
        <v-list-item link @click.prevent="goToProfile">
          <template v-slot:prepend>
            <v-icon>mdi-account</v-icon>
          </template>
          <v-list-item-title class="font-weight-mediun">Alterar Preferências</v-list-item-title>
        </v-list-item>
        <v-list-item link @click.prevent="logout">
          <template v-slot:prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title class="font-weight-medium">Sair</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { useUserStore } from '@/store/Usuario/usuarioStore'
import { appStore } from '@/store/app'
import { useRouter } from 'vue-router'
import { useCookie } from 'vue-cookie-next'

export default {
  name: 'AppBar',
  props: {
    title: {
      type: String,
      default: 'Home'
    }
  },
  emits: ['toggle-drawer'],
  setup() {
    const user = useUserStore()
    const app = appStore()
    const router = useRouter()
    const cookie = useCookie()
    const theme = useTheme()

    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
      localStorage.setItem('theme_user', theme.global.name.value)
    }

    const logout = async () => {
      await user.fetchLogoff()
      if (cookie.isCookieAvailable('token')) {
        cookie.removeCookie('token')
      }
      router.push({ path: '/login', replace: true })
    }

    const goToProfile = () => {
      router.push('/perfil')
    }

    const isDark = computed(() => theme.global.current.value.dark)
    const avatarSrc = '' //computed(() => user.getAvatar(user.matricula))
    const loadingLength = computed(() => app._loading.length)
    const loadingText = computed(() => (app._loading.length ? app._loading[0] : ''))

    return { user, toggleTheme, logout, goToProfile, isDark, avatarSrc, loadingLength, loadingText }
  }
}
</script>
