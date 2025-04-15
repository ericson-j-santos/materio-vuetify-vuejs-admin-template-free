src/layouts/default/Home.vue
<template>
  <v-app id="inspire">
    <v-navigation-drawer temporary v-model="drawer">
      <v-list-item title="Empresa" subtitle="Empresa X">
        <small class="opaco">versão: {{ app.versao }}</small>
      </v-list-item>
      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home" title="Inicio" to="/home"></v-list-item>
        <v-list-item prepend-icon="mdi-monitor-dashboard" title="Dashboard" to="/paineis"></v-list-item>
        <v-list-item prepend-icon="mdi-note-search-outline" title="Consultar demandas" to="/demandas" color="primary"
          rounded="xl"></v-list-item>
      </v-list>

      <v-card class="mx-auto" width="300">

        <v-list v-model:opened="open">

          <v-list-group value="Users">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" prepend-icon="mdi-account-circle" title="Users">

              </v-list-item>
            </template>

            <v-list-group value="Admin">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="Admin"></v-list-item>
              </template>

              <v-list-item v-for="([title, icon], i) in admins" :key="i" :prepend-icon="icon" :title="title"
                :value="title"></v-list-item>
            </v-list-group>

            <v-list-group value="Actions">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="Actions"></v-list-item>
              </template>

              <v-list-item v-for="([title, icon], i) in cruds" :key="i" :prepend-icon="icon" :title="title"
                :value="title"></v-list-item>
            </v-list-group>
          </v-list-group>
        </v-list>
      </v-card>

      <v-list density="compact" nav>
        <v-divider></v-divider>
        <v-list-item prepend-icon="mdi-file-sign" title="Fila R" to="/retencao/fila" color="primary"
          rounded="xl"></v-list-item>
      </v-list>

      <v-list density="compact" nav>
        <v-divider></v-divider>
        <v-list-item prepend-icon="mdi-note-search" title="Incluir propostas" to="/propostas/cadastrar" color="primary"
          rounded="xl"></v-list-item>
        <v-list-item prepend-icon="mdi-note-search" title="Consultar propostas" to="/propostas" color="primary"
          rounded="xl"></v-list-item>
      </v-list>

      <v-list density="compact" nav>
        <v-divider></v-divider>
        <v-list-item prepend-icon="mdi-chart-bar" title="Relatórios" to="/relatorios" color="primary"
          rounded="xl"></v-list-item>
        <v-list-item prepend-icon="mdi-robot-industrial-outline" title="Rotinas" to="/rotinas" color="primary"
          rounded="xl"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar show-arrows :class="{ barBg: !theme.global.current.value.dark }" class="fixed-bar fixed-tabs-bar">
      <v-progress-linear v-show="app._loading.length" color="deep-purple-accent-3" height="60" inderterminate
        class="loading" striped absolute bottom>
        {{ app._loading.length ? app._loading[0] : '' }}
      </v-progress-linear>

      <template v-slot:prepend>
        <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="text-white font-weight-medium ">{{ titulo }}</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn icon @click="alternarTema">
        <v-icon color="white">mdi-theme-light-dark</v-icon>
      </v-btn>

      <v-menu offset-y width="410">
        <template v-slot:activator="{ props }">
          <div style="cursor: pointer" v-bind="props" overlap offset-x="1" offset-y="25" dot class="me-3">
            <v-avatar size="40px">
              <v-img cover src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
            </v-avatar>
            {{ usuario.matricula }} <br /><small>{{ usuario.nome }}</small>
          </div>
        </template>

        <v-list>
          <div class="pb-3 pt-2">
            <v-badge overlap offset-x="1" offset-y="30" class="ms-4" dot>
              <v-avatar size="40px">
                <v-img cover src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-img>
              </v-avatar>
            </v-badge>

            <div class="d-inline-flex flex-column justify-center mx-5"
              style="vertical-align: middle; margin-top: -20px; padding-top: 15px">
              <span class="text--primary font-weight-semibold mb-n1 pb-2">{{ usuario.nome || '' }}</span>
              <small class="text-medium-emphasis text-capitalize">{{ usuario.funcao || '' }}</small>
              <small class="text-medium-emphasis text-capitalize">Unid. {{ usuario.lotacao || '' }}</small>
            </div>
          </div>

          <v-divider></v-divider>

          <v-list-item link @click.prevent="telaPerfil">
            <template v-slot:prepend>
              <v-icon icon="mdi-logout"></v-icon>
            </template>
            <v-list-item-title class="font-weight-mediun">Alterar Preferências</v-list-item-title>
          </v-list-item>

          <v-list-item link @click.prevent="logout">
            <template v-slot:prepend>
              <v-icon icon="mdi-logout"></v-icon>
            </template>
            <v-list-item-title class="font-weight-medium">Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app height="64px" class="barBg">
      <v-spacer></v-spacer>
      <span class="text-body-2 text-light-white-darken-2">
        <strong>SIGLA</strong> - SIGLA Empresa de X - {{ app.versao }}
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import { ref, inject } from 'vue'
import { useTheme } from 'vuetify'
import { useUserStore } from '../store/Usuario/usuarioStore'
import { appStore } from '@/store/app'
import { useCookie } from 'vue-cookie-next'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export default {
  name: 'DefaultLayout',
  setup() {
    const usuario = useUserStore()
    const theme = useTheme()
    const cookie = useCookie()
    const router = useRouter()
    const app = appStore()

    // Propriedades reativas para a nova navegação
    const open = ref(['Users'])
    const admins = [
      ['Gerenciamento', 'mdi-account-multiple-outline'],
      ['Configuração', 'mdi-cog-outline'],
    ]
    const cruds = [
      ['Create', 'mdi-plus-outline'],
      ['Read', 'mdi-file-outline'],
      ['Update', 'mdi-update'],
      ['Delete', 'mdi-delete'],
    ]

    function alternarTema() {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
      localStorage.setItem("theme_user", theme.global.name.value)
    }

    async function logout() {
      await usuario.fetchLogoff()
      if (cookie.isCookieAvailable('token')) {
        cookie.removeCookie('token')
      }
      router.push({ path: '/login', replace: true })
    }
    return { usuario, theme, alternarTema, logout, app, open, admins, cruds }
  },

  data() {
    return {
      drawer: null,
      titulo: inject("titulo"),
    }
  },

  computed: {
    avatarSrc() {
      return this.usuario.getAvatar(this.usuario.matricula)
    },
    notificacoes() {
      return this.app.notificacoes.length
    }
  },
  watch: {
    notificacoes: (qtd) => {
      if (qtd === 0) return
      const app = appStore()
      app.notificacoes.forEach(nota => {
        toast.info(nota, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
        app.notificacoes = app.notificacoes.filter(n => n !== nota)
      })
    }
  },
  methods: {
    telaPerfil() {
      this.$router.push('/perfil')
    }
  },
  created() {
    const theme = useTheme()
    const theme_user = localStorage.getItem("theme_user")
    theme.global.name.value = theme_user ? theme_user : 'light'
  }
}
</script>

<style>
.barBg {
  background: linear-gradient(90deg, #005ca9, #54bbab) !important;
}

.loading {
  text-align: center;
  opacity: 60%;
  color: #fff;
}

.fixed-bar {
  position: -webkit-sticky;
  position: sticky;
  top: 4rem;
  z-index: 2;
}
</style>
