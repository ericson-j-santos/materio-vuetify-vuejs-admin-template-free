import { createApp } from 'vue'
import App from '@/App.vue'
import { registerPlugins } from '@core/utils/plugins'

// Styles
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@mdi/font/css/materialdesignicons.css'

// Create vue app
const app = createApp(App)


// Register plugins
registerPlugins(app)

// app.use(createPinia())

// Mount vue app
app.mount('#app')


