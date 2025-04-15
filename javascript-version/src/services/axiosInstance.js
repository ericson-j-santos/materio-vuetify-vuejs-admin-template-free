// services/axiosInstance.js
import axios from 'axios'
import { usuarioStore } from '@/store/Usuario/usuarioStore';

// Determina a base URL com base no ambiente
const baseURL =
    import.meta.env.MODE === 'development'
        ? import.meta.env.VITE_API_BASE_URL
        : import.meta.env.VITE_API_PROD_BASE_URL || import.meta.env.VITE_API_BASE_URL;

// Cria a instância do Axios com base URL configurada
const axiosInstance = axios.create({
    baseURL: baseURL, // Base URL da sua API
})

// Adicionar um interceptor para incluir o token em todas as requisições
axiosInstance.interceptors.request.use(
    (config) => {
        const usuario = usuarioStore(); // Acesse a store de autenticação
        if (usuario && usuario.accessToken) {
            config.headers.Authorization = `Bearer ${usuario.accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Tratar erro de autenticação (401)
        if (error.response && error.response.status === 401) {
            const usuario = usuarioStore(); // Acesse a store de autenticação
            await usuario.fetchLogoff();
            // Opcional: Redirecionar para a página de login ou mostrar uma notificação

        }
        return Promise.reject(error);
    }
);

console.log('Modo:', import.meta.env.MODE);
console.log('Base URL:', baseURL);

export default axiosInstance
