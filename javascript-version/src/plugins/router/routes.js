// src/plugins/router/routes.js
export const routes = [

  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '/',
        redirect: '/pokemon/pikachu'
      },  // Redireciona para um Pokémon padrão
      {
        path: '/pokemon/:name',
        name: 'PokemonDetails',
        component: () => import('@/views/PokemonDetails.vue'),
        meta: { label: 'Detalhe Pokemon', exibirPreferencia: true }
      },
      {
        path: '/manage-scopes',
        name: 'ManageScopes',
        component: () => import('@/views/ManageScopes.vue'),
        meta: { requiresAdmin: true }
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/layouts/components/default/Home.vue'),

        meta: { requiresAdmin: false }
      },
      // {
      //   path: '/:catchAll(.*)', redirect: '/'
      // },  // Rota catch-all

      // {
      //   path: 'DetalhePokemon/:id',
      //   component: () => import('@/components/DetalhePokemon.vue'),
      //   meta: { label: 'Detalhe Pokemon', exibirPreferencia: true }

      // },


      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
        meta: { label: 'Dashboard', exibirPreferencia: true }
      },
      {
        path: 'DashboardView',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: { label: 'Análise Diária', exibirPreferencia: true }
      },
      {
        path: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
        meta: { label: 'Conta' }
      },
      // {
      //   path: 'preferencia-conta',
      //   component: () => import('@/views/pages/account-settings/Preferencias.vue'),
      //   meta: { label: 'Preferência da Conta', exibirPreferencia: true }
      // },
      {
        path: 'typography',
        component: () => import('@/pages/typography.vue'),
        meta: { label: 'Tipografia', exibirPreferencia: true }
      },
      {
        path: 'icons',
        component: () => import('@/pages/icons.vue'),
        meta: { label: 'Ícones', exibirPreferencia: true }

      },
      {
        path: 'cards',
        component: () => import('@/pages/cards.vue'),
        meta: { label: 'Cards', exibirPreferencia: true }

      },
      {
        path: 'tables',
        component: () => import('@/pages/tables.vue'),
        meta: { label: 'Tabelas', exibirPreferencia: true }

      },
      {
        path: 'form-layouts',
        component: () => import('@/pages/form-layouts.vue'),
        meta: { label: 'Layouts de Formulário', exibirPreferencia: true }

      },

    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
]
