// src\plugins\router\index.js

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useUserStore } from '@/store/Usuario/usuarioStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from) => {
  const usuarioStore = useUserStore()

  // Se a rota requer admin e o usuário não é admin, redireciona para a página inicial
  if (to.meta.requiresAdmin && usuarioStore.currentUser?.role !== 'admin') {
    console.log('[Router Guard] Acesso negado à rota:', to.path)
    alert('Acesso restrito a administradores.')
    // next({ name: 'dashboard' }) // Redireciona para a página inicial
    return { path: '/' }
  }
  // return true

  // Se o usuário acessar a rota raiz ('/') e houver uma preferência definida,
  // redireciona para ela
  if (to.path === '/') {
    let caminhoPreferido = usuarioStore.preferenciaPaginaInicial
    if (caminhoPreferido && !caminhoPreferido.startsWith('/')) {
      caminhoPreferido = '/' + caminhoPreferido
      const destino = caminhoPreferido || 'dashboard'
      console.log('[Router Guard] Rota acesssada:', to.path, 'Preferencia do usuario:', caminhoPreferido)
      return next(destino)
      // return { path: caminhoPreferido || '/dashboard' }

    }
  }
  return true

  // Se o usuário acessar a rota raiz ('/') e houver uma prefêrencia definida,redireciona para ela
  // if (to.path === '/') {
  //   const destino = caminhoPreferido || 'dashboard'
  //   console.log('[Router Guard] Redirecinando para página preferida:', destino)
  //   next(destino)
  // } else {
  //   next()
  // }
})

export default function (app) {
  app.use(router)
}
export { router }
