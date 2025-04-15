// src/services/dashboard/analiseDiariaService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'// URL do json-server

/**
 * Retorna os dados do dashboard.
 */
export const capturaDashboardData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/relatorio`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do dashboard:', error);
        throw error;
    }
};
