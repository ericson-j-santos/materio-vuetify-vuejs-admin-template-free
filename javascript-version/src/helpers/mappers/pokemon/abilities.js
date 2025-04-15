/**
 * Extrai e limpa os dados das habilidades de um Pokémon.
 *
 * @param {Object} apiData - Objeto retornado pela API do Pokémon.
 * @returns {Array} Array de objetos representando cada habilidade.
 */
export function mapPokemonAbilities(apiData) {
    if (!apiData || !Array.isArray(apiData.abilities)) {
        return []
    }
    return apiData.abilities
        .map(item => {
            if (!item.ability) return null
            return {
                name: item.ability.name || "unknown",
                url: item.ability.url || "",
                is_hidden: Boolean(item.is_hidden),
                slot: item.slot || null
            }
        })
        .filter(item => item !== null)
}
