import { criarInstanciaApi } from "./utilitariosApi";

const apiPortabilidade = criarInstanciaApi(import.meta.env.VITE_API_PROD_BASE_URL, '/portabilidade');

export default apiPortabilidade;


