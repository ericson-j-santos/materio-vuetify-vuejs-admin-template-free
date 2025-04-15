src/layouts/default/Home.vue
<template>
  <v-app id="inspire">
    <NavigationDrawer :modelValue="drawer" @update:modelValue="drawer = $event" :appVersion="app.versao" />
    <AppBar :title="titulo" @toggle-drawer="drawer = !drawer" />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter :appVersion="app.versao" />
  </v-app>
</template>

<script>
import { ref, inject } from 'vue'
import NavigationDrawer from '@/layouts/components/NavigationDrawer.vue'
import AppBar from '@/layouts/components/AppBar.vue'
import AppFooter from '@/layouts/components/AppFooter.vue'
import { useUserStore } from '@/store/Usuario/usuarioStore'
import { appStore } from '@/store/app'
import { useTheme } from 'vuetify'

export default {
  name: 'DefaultLayout',
  components: { NavigationDrawer, AppBar, AppFooter },
  setup() {
    const usuario = useUserStore()
    const app = appStore()
    const theme = useTheme()

    // Inicializa o tema conforme preferência do usuário
    const theme_user = localStorage.getItem('theme_user')
    theme.global.name.value = theme_user ? theme_user : 'light'

    return { usuario, app }
  },
  data() {
    return {
      drawer: false,
      titulo: inject("titulo")
    }
  },
  computed: {
    avatarSrc() {
      return this.usuario.getAvatar(this.usuario.matricula)
    }
  },
  watch: {
    notificacoes(qtd) {
      if (qtd === 0) return
      this.app.notificacoes.forEach(nota => {
        // Aqui você pode invocar o toast ou outra notificação
        this.app.notificacoes = this.app.notificacoes.filter(n => n !== nota)
      })
    }
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
