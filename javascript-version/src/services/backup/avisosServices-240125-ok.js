// services/avisosServices.js
import axiosInstance from './axiosInstance';
import { usuarioStore } from '@/store/usuarioStore';

/**
 * Faz uma requisição GET para buscar avisos na API
 * @returns {Promise<Object>} Objeto contendo { avisos: Array }
 */
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
})
async function carregarAvisos() {
    try {
        const response = await axiosInstance.get('/avisos');
        return response.data; // que deve ter o formato { avisos: [...] }

    } catch (error) {
        console.error('[ERRO] Ao carregar avisos da API:', error);
        throw error;
    }
}

export { carregarAvisos };