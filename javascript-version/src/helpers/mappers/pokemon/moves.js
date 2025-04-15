/**
 * Extrai e limpa os dados dos movimentos de um Pokémon.
 *
 * @param {Object} apiData - Objeto retornado pela API do Pokémon.
 * @returns {Array} Array de objetos representando cada movimento.
 */
export function mapPokemonMoves(apiData) {
    if (!apiData || !Array.isArray(apiData.moves)) {
        return []
    }
    return apiData.moves
        .map(moveItem => {
            if (!moveItem.move) return null
            return {
                name: moveItem.move.name || "unknown",
                url: moveItem.move.url || ""
            }
        })
        .filter(item => item !== null)
}
