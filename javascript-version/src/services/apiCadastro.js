// src/services/apiCadastro.js
import { criarInstanciaApi } from "./utilitariosApi";

// Definir o recurso conforme suas rotas no json-server-auth. Exemplo: '/usuarios'
const apiCadastro = criarInstanciaApi(import.meta.env.VITE_API_BASE_URL, '/');

export default apiCadastro;