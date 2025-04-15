/**
 * Mapeia e limpa os dados completos de um Pokémon.
 * Retorna os campos: name, id, abilities, stats, moves e sprites.
 *
 * @param {Object} apiData - Objeto retornado pela API do Pokémon.
 * @returns {Object} Dados transformados.
 * @throws {Error} Se apiData for inválido ou se campos obrigatórios estiverem ausentes.
 */
export function mapPokemonFull(apiData) {
    if (!apiData) {
        throw new Error("Dados da API inválidos")
    }

    const { name, id, abilities, stats, moves, sprites } = apiData

    if (!name || !id) {
        throw new Error("Nome ou ID do Pokémon estão ausentes")
    }

    const cleanedAbilities = Array.isArray(abilities)
        ? abilities
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
        : []

    const cleanedStats = Array.isArray(stats)
        ? stats
            .map(statItem => {
                if (!statItem.stat) return null
                return {
                    name: statItem.stat.name || "unknown",
                    base_stat: statItem.base_stat || 0,
                    effort: statItem.effort || 0
                }
            })
            .filter(item => item !== null)
        : []

    const cleanedMoves = Array.isArray(moves)
        ? moves
            .map(moveItem => {
                if (!moveItem.move) return null
                return {
                    name: moveItem.move.name || "unknown",
                    url: moveItem.move.url || ""
                }
            })
            .filter(item => item !== null)
        : []

    const cleanedSprites = sprites || {}

    return {
        name,
        id,
        abilities: cleanedAbilities,
        stats: cleanedStats,
        moves: cleanedMoves,
        sprites: cleanedSprites
    }
}
