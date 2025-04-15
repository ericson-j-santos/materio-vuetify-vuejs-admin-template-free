import { criarInstanciaApi } from "./utilitariosApi";

const apiTeds = criarInstanciaApi(import.meta.env.VITE_API_PROD_BASE_URL, '/teds');


export default apiTeds;






