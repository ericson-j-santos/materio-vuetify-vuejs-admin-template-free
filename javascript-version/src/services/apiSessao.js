// Objetivo: Arquivo para exportar a instância da API de sessão
// src/services/apiSessao.js
import { criarInstanciaApi } from "./utilitariosApi";

// A baseURL será '', pois o proxy cuidará do redirecionamento
const apiSessao = criarInstanciaApi(import.meta.env.VITE_API_BASE_URL, '/sessao')
// json-server-auth utiliza '/login' para autenticação

// const apiSessao = criarInstanciaApi(import.meta.env.VITE_API_PROD_BASE_URL, '/sessao');

export default apiSessao;
