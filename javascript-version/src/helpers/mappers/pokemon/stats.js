/**
 * Extrai e limpa os dados das estatísticas de um Pokémon.
 *
 * @param {Object} apiData - Objeto retornado pela API do Pokémon.
 * @returns {Array} Array de objetos representando cada estatística.
 */
export function mapPokemonStats(apiData) {
    if (!apiData || !Array.isArray(apiData.stats)) {
        return []
    }
    return apiData.stats
        .map(statItem => {
            if (!statItem.stat) return null
            return {
                name: statItem.stat.name || "unknown",
                base_stat: statItem.base_stat || 0,
                effort: statItem.effort || 0
            }
        })
        .filter(item => item !== null)
}
