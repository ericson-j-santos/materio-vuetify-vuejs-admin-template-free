/**
 * Mapeia e limpa os dados de um usuário.
 * Retorna os campos: id, name, role, allowedScopes e preferenciaPaginaInicial.
 *
 * @param {Object} apiData - Objeto retornado pela API do usuário.
 * @returns {Object} Dados do usuário transformados.
 * @throws {Error} Se os dados forem inválidos ou se campos obrigatórios estiverem ausentes.
 */
export function mapUserData(apiData) {
    if (!apiData) {
        throw new Error("Dados do usuário são inválidos")
    }
    const { id, name, role, allowedScopes, preferenciaPaginaInicial } = apiData
    if (!id || !name) {
        throw new Error("ID ou nome do usuário estão ausentes")
    }
    return {
        id,
        name,
        role: role || "unknown",
        allowedScopes: Array.isArray(allowedScopes) ? allowedScopes : [],
        preferenciaPaginaInicial: preferenciaPaginaInicial || ""
    }
}
