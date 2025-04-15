// src/store/app.js
import { defineStore } from 'pinia'

export const appStore = defineStore('app', {
    state: () => ({
        _loading: [], // Guarda os identificadores de carregamento
        atualizar: false,
        notificacoes: [],

        // Propriedade do snachbar:
        __snackbar: false,
        __textoSnackbar: "",
        snackbarVariant: 'info', // 'info', 'success', 'warning' ou 'danger'
        snackActionLabel: "",

        erroSessao: "",
        versao: '20241213v1',


    }),

    actions: {

        /**
         * Inicia um indicador de carregamento
         * @param {String} texto - Identificador único para o carregamento
         */
        startLoading(texto) {
            // if (!this._loading.includes(texto)) {
            this._loading.push(texto)
            // }
        },

        /**
         * Finaliza um indicador de carregamento
         * @param {String} texto - Identificador único para o carregamento
         */
        stopLoading(texto) {
            const index = this._loading.indexOf(texto)
            // if (index !== -1) {
            this._loading.splice(index, 1)
            // }
        },

        /**
         * Ativa uma notificação snackbar com o texto fornecido
         * @param {String} texto - Texto da notificação
         */
        // notificar(texto) {
        //     this.__textoSnackbar = texto
        //     this.__snackbar = true
        // },
        // Método de notificação atualizado
        notificar(nota, variant = 'info', actionLabel = "") {
            // this.notificacoes.push(nota)
            // Atualiza as variáveis que o Snackbar global está observando
            this.__textoSnackbar = nota
            this.snackbarVariant = variant
            this.snackActionLabel = actionLabel

            // Reinicia o snackbar para forçar a reabertura
            this.__snackbar = false
            setTimeout(() => {
                this.__snackbar = true
            }, 0)
            // Se desejar também armazenar na lista de notificações:
            // this.notificacoes.push(nota)
        },


        isLoading() {
            return this._loading.length > 0
        },

        // Método para exibir notificações via Snackar
        // mostrarNotificacao(texto) {
        //     this.__textoSnackbar = texto;
        //     this.__snackbar = true;

        // },

        /**
         * Desativa a notificação snackbar
         */
        fecharSnackbar() {
            this.__snackbar = false
            this.__textoSnackbar = ""
        },


    }
})
