// services/avisosServices.js
import axiosInstance from './axiosInstance';

/**
 * Faz uma requisição GET para buscar avisos na API
 * @returns {Promise<Object>} Objeto contendo { avisos: Array }
 */

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