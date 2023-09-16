const POKEMON_QUERY_NAME = 'pokemon_v2_pokemonspecies'
const TYPE_QUERY_NAME = 'pokemon_v2_pokemontype'
const COLOR_QUERY_NAME = 'pokemon_v2_pokemoncolor'
const ABILITY_QUERY_NAME = 'pokemon_v2_ability'
const QUERIES = `query data {
      ${POKEMON_QUERY_NAME} {
            name id
            ${COLOR_QUERY_NAME} { name }
      }
      ${TYPE_QUERY_NAME} (where: { pokemon_id: { _lte: 1010 } }) {
            pokemon_id pokemon_v2_type { name }
      }
      ${COLOR_QUERY_NAME} { name }
      ${ABILITY_QUERY_NAME} { name pokemon_v2_pokemonabilities { pokemon_id } }
}`
const HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}
const URL = "https://beta.pokeapi.co/graphql/v1beta"


export const state = () => ({
    loading: false,
    error: false,

    pokemons: [],

    typesValues: [],
    colorsValues: [],
    abilitiesValues: [],

    typeFilter: [],
    nameFilter: null,
    colorFilter: null,
    abilityFilter: null
})


export const actions = {
    async getData({ commit }) {
        try {
            commit('setLoading', true)
            commit('setError', false)
            const pokemonsData = await this.$axios({
                method: "post",
                baseURL: URL,
                data: { query: QUERIES, variables: null },
                headers: HEADERS
            })

            if (pokemonsData.data.errors) return commit('setError', pokemonsData.data.errors[0].message)

            const pokemons = pokemonsData.data.data[POKEMON_QUERY_NAME]

            const colors = pokemonsData.data.data[COLOR_QUERY_NAME].map(color => color.name)

            const types = pokemonsData.data.data[TYPE_QUERY_NAME].reduce((reducer, poke_type) => {
                const type_name = poke_type['pokemon_v2_type'].name
                const pokemon_id = poke_type['pokemon_id']

                if (!reducer.includes(type_name)) reducer.push(type_name)
                const pokemon = pokemons.find(pokemon => pokemon.id === pokemon_id)
                if (pokemon) {
                    if (!pokemon.types) pokemon.types = []
                    pokemon.types.push(type_name)
                }
                return reducer
            }, [])

            const abilities = pokemonsData.data.data[ABILITY_QUERY_NAME].reduce((reducer, ability) => {
                if (!reducer.includes(ability.name)) reducer.push(ability.name)
                ability['pokemon_v2_pokemonabilities'].forEach(pokemon_ref => {
                    const pokemon_id = pokemon_ref['pokemon_id']
                    const pokemon = pokemons.find(pokemon => pokemon.id === pokemon_id)
                    if (pokemon) {
                        if (!Object.keys(pokemon).includes('abilities')) pokemon['abilities'] = []
                        pokemon['abilities'].push(ability.name)
                    }
                })
                return reducer
            }, [])

            commit('setPokemons', pokemons.sort((a, b) => a.id - b.id))
            commit('setColorsValues', colors)
            commit('setTypesValues', types)
            commit('setAbilitiesValues', abilities)
        }
        catch (e) { commit('setError', e.message) }
        finally { commit('setLoading', false) }
    },
}


export const mutations = {
    setLoading(state, value) { state.loading = value },
    setError(state, value) { state.error = value },

    setPokemons(state, value) { state.pokemons = value },

    setTypesValues(state, values) { state.typesValues = values },
    setColorsValues(state, values) { state.colorsValues = values },
    setAbilitiesValues(state, values) { state.abilitiesValues = values },

    setTypesFilter(state, values) { state.typeFilter = values },
    setNameFilter(state, value) { state.nameFilter = value },
    setColorFilter(state, value) { state.colorFilter = value },
    setAbilityFilter(state, value) { state.abilityFilter = value },
}


export const getters = {
    getPokemons: state => {
        return state.pokemons.filter(pokemon => {
            if (state.typeFilter.length > 0) {
                let found = state.typeFilter.every(pokemon_type => { return pokemon.types.includes(pokemon_type) })
                if (!found) return false
            }
            if (state.nameFilter && !pokemon.name.includes(state.nameFilter)) return false
            if (state.colorFilter && pokemon[COLOR_QUERY_NAME].name !== state.colorFilter) return false
            return !(state.abilityFilter && !pokemon.abilities.includes(state.abilityFilter));

        })
    },
}


export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state
}
