import { criarInstanciaApi } from "./utilitariosApi";

const apiDemandasVinculadas = criarInstanciaApi(import.meta.env.VITE_API_PROD_BASE_URL, '/demandasVinculadas');

export default apiDemandasVinculadas;


