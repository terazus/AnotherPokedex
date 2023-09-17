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
      <v-col cols="12">
        <v-card>
          <v-card-title class="primary--text">
            <h1
              style="width:100%"
              class="text-center"
            >
              {{ pokemon.name.toUpperCase() }}
            </h1>
          </v-card-title>
          <v-card-text>
            <v-list
              v-for="(value, field, index) in pokemon"
              :key="'field_' + index"
            >
              <v-list-item>
                <v-list-item-content>
                  {{ field }}: {{ value }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
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
      let pokemon = await axios.get(BASE_INTEGER_URL +  route.params['pokemonID'])
      return { pokemon: pokemon['data'], error: null }
    }
    catch (error) { return { error: "Pokemon not found", pokemon: null } }
  }
}
</script>

<style scoped>

</style>
