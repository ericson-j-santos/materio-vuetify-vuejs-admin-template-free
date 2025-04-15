// src/store/Dashboard/analiseDiariaStore.js





import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { capturaDashboardData } from '@/services/dashboard/analiseDiariaService'
import { appStore } from '@/store/app'

export const useAnaliseDiariaStore = defineStore('analiseDiariaStore', () => {
    const data = useStorage([])
    const app = appStore()


    async function capturaAnaliseDiariaData() {
        app.startLoading()
        try {
            const result = await capturaDashboardData()
            data.value = result
        } catch (err) {
            console.error('Erro ao buscar dados do dashboard:', err)
            // app.setError(err)
        } finally {
            app.startLoading()
        }
    }

    const dadosFormatados = computed(() => {
        return data.value.map((item) => {
            const valorTotal = item.vl_total || 1 // para evitar divisão por zero
            const valorEfetivadas = item.vl_efetivadas || 0
            const porcentagemEfetivadas = Number(((valorEfetivadas / valorTotal) * 100).toFixed(2))
            const valorLiberado = Number((valorTotal - valorEfetivadas).toFixed(2))
            const porcentagemLiberadas = Number(((valorLiberado / valorTotal) * 100).toFixed(2))
            const quantidadeLiberadas = item.qtd_total - item.quantidade_efetivadas
            const quantidade_total = item.qtd_total || 1
            return {
                ...item,
                porcentagemEfetivadas,
                valor_liberado: valorLiberado,
                porcentagemLiberadas,
                quantidade_liberadas: quantidadeLiberadas,
                quantidade_total,
            }
        })
    })

    return { data, capturaAnaliseDiariaData, dadosFormatados }
})



// /* eslint-disable camelcase */
// /* eslint-disable newline-before-return */
// /* eslint-disable arrow-parens */
// /* eslint-disable padding-line-between-statements */
// /* eslint-disable indent */
// /* eslint-disable semi */
// // src/store/dashboardStore.js
// import { defineStore } from 'pinia';
// import axios from 'axios';
// import { capturaDashboardData } from '@/services/dashboard/analiseDiariaService';

// export const useAnaliseDiariaStore = defineStore('analiseDiariaStore', {
//     state: () => ({
//         data: [],
//         error: null,
//         loading: false,

//     }),
//     actions: {
//         async capturaAnaliseDiariaData() {
//             this.loading = true;
//             this.error = null;
//             try {
//                 // Supondo que o json-server esteja rodando na porta 3000 e os dados estejam em /relatorio
//                 const data = await capturaDashboardData();

//                 // console.log('response', response);
//                 //console.log('response.data', response.data);

//                 this.data = data;

//                 console.log('this.data', this.data);

//                 // return this.data
//             } catch (error) {
//                 this.error = error;
//             } finally {
//                 this.loading = false;
//             }
//         },
//     },
//     getters: {
//         dadosFormatados(state) {
//             return state.data.map((item) => {
//                 const valorTotal = item.vl_total || 1; // evitar divisão por zero
//                 const valorEfetivadas = item.vl_efetivadas || 0;
//                 const porcentagemEfetivadas = Number(((valorEfetivadas / valorTotal) * 100).toFixed(2));
//                 const valorLiberado = Number((valorTotal - valorEfetivadas).toFixed(2));
//                 const porcentagemLiberadas = Number(((valorLiberado / valorTotal) * 100).toFixed(2));
//                 const quantidadeLiberadas = item.qtd_total - item.quantidade_efetivadas;
//                 const quantidade_total = item.qtd_total || 1; // evitar divisão por zero
//                 return {
//                     ...item,
//                     porcentagemEfetivadas,
//                     valor_liberado: valorLiberado,
//                     porcentagemLiberadas,
//                     quantidade_liberadas: quantidadeLiberadas,
//                     quantidade_total,
//                 };
//             });
//         },
//     },
// });
