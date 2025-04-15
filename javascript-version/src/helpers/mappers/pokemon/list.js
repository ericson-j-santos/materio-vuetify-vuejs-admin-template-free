/**
 * Mapeia uma lista de dados de Pokémon utilizando uma função de mapeamento.
 *
 * @param {Array} apiDataList - Lista de objetos retornados pela API.
 * @param {Function} mapperFn - Função para transformar cada item (por exemplo, mapPokemonBasic).
 * @returns {Array} Lista de objetos mapeados.
 * @throws {Error} Se os dados não forem um array.
 */
export function mapPokemonList(apiDataList, mapperFn) {
    if (!Array.isArray(apiDataList)) {
        throw new Error("Os dados fornecidos não são uma lista válida")
    }
    return apiDataList.map(item => mapperFn(item))
}
