import { criarInstanciaApi } from "./utilitariosApi";

const apiDemandasFinalizadas = criarInstanciaApi(import.meta.env.VITE_API_PROD_BASE_URL, '/demandasFinalizadas');

export default apiDemandasFinalizadas;