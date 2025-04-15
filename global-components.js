// global-components.js
import MaisBotao from './src/@core/components/MaisBotao.vue'
import GlobalSnackbar from './src/@core/components/GlobalSnackbar.vue'


const GlobalComponentsPlugin = {
    install(app) {
        app.component('MaisBotao', MaisBotao)
        app.component('GlobalSnackbar', GlobalSnackbar)

    }
}

export default GlobalComponentsPlugin

