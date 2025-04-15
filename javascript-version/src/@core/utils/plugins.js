/**
 * Esta é uma função auxiliar para registrar plugins como um nuxt
 * Para registrar um plugin, basta exportar uma função const `defineVuePlugin` que recebe `app` *como argumento e chama `app.use`
 * Para escanear plugins, ele incluirá todos os arquivos em `src/plugins` e `src/plugins/**\/*index.ts`
 *
 *
 * @param {App} app Vue app instance
 * @returns void
 *
 * @example
 * ```ts
 * // File: src/plugins/vuetify/index.ts
 *
 * import type { App } from 'vue'
 * import { createVuetify } from 'vuetify'
 *
 * const vuetify = createVuetify({ ... })
 *
 * export default function (app: App) {
 *   app.use(vuetify)
 * }
 * ```
 *
 * All you have to do is use this helper function in `main.ts` file like below:
 * ```ts
 * // File: src/main.ts
 * import { registerPlugins } from '@core/utils/plugins'
 * import { createApp } from 'vue'
 * import App from '@/App.vue'
 *
 * // Create vue app
 * const app = createApp(App)
 *
 * // Register plugins
 * registerPlugins(app) // [!code focus]
 *
 * // Mount vue app
 * app.mount('#app')
 * ```
 */
export const registerPlugins = app => {
  const imports = import.meta.glob(['../../plugins/*.{ts,js}', '../../plugins/*/index.{ts,js}'], { eager: true })
  const importPaths = Object.keys(imports).sort()

  importPaths.forEach(path => {
    const pluginImportModule = imports[path]

    pluginImportModule.default?.(app)
  })
}
