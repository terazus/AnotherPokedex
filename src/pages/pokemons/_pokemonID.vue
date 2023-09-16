<template>
  <v-container fluid>
    <v-row v-if="error">
      <v-col cols="12">
        <v-alert type="error">
          ERROR: {{ error }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      {{ pokemon }}
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'


const BASE_INTEGER_URL = 'https://pokeapi.co/api/v2/pokemon/'

export default {
  name: "PokemonID",
  async asyncData({ route }) {
    try {
      const reference = route.params['pokemonID']
      let pokemon = await axios.get(BASE_INTEGER_URL + reference)
      return { pokemon: pokemon['data'], error: null }
    }
    catch (error) { return { error: "Pokemon not found", pokemon: null } }
  },
  computed: {
    test() { return 'test'}
  }
}
</script>

<style scoped>

</style>
