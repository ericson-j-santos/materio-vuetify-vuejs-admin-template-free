/**
 * Mapeia os dados básicos de um Pokémon (name e id).
 *
 * @param {Object} apiData - Objeto retornado pela API do Pokémon.
 * @returns {Object} Objeto contendo name e id.
 * @throws {Error} Se apiData for inválido ou se os campos obrigatórios estiverem ausentes.
 */
export function mapPokemonBasic(apiData) {
    if (!apiData) {
        throw new Error("Dados da API inválidos")
    }
    const { name, id } = apiData
    if (!name || !id) {
        throw new Error("Nome ou ID do Pokémon estão ausentes")
    }
    return { name, id }
}
