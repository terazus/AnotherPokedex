<template>
  <v-container
    fluid
    style="min-height: 90vh"
  >
    <v-row>
      <v-col
        cols="12"
        class="animated fadeIn"
      >
        <v-card>
          <v-card-title>
            <h2 class="primary--text">
              Search Pokemons
            </h2>
          </v-card-title>
          <v-card-text>
            <SearchNames />
            <SearchTypes />
            <SearchColors />
            <SearchAbilities />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="error">
      <v-col cols="12">
        <v-alert type="error">
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row
      v-else
      style="height: 100%"
      align="center"
    >
      <v-col
        cols="12"
        class="d-flex flex-column justify-center align-center white--text slow"
      >
        <v-container
          fluid
          class="pa-0"
        >
          <v-row>
            <v-col
              v-for="(pokemon, index) in getPokemons()"
              :key="'pokemon_' + index"
              cols="12"
              xl="2"
              lg="3"
              md="4"
              sm="6"
              xs="12"
            >
              <v-lazy
                :options="{ threshold: 1 }"
                :min-height="200"
                transition="fade-transition"
              >
                <v-card class="pa-0">
                  <nuxt-link :to="'/pokemons/' + pokemon.id">
                    <v-card-title class="pb-0 mb-0">
                      <PokemonColor :color="pokemon['pokemon_v2_pokemoncolor'].name" />
                      <v-spacer />
                      <span class="text-body-2">#{{ pokemon.id.toString().padStart(4, "0") }}</span>
                    </v-card-title>
                    <v-card-title class="pt-0 px-0 d-flex flex-column justify-center align-center">
                      <img
                        :src="imageBaseURL + pokemon.id + '.png'"
                        :alt="pokemon.name + ' image'"
                        width="50%"
                      >
                      <h3
                        style="width: 100%"
                        class="text-center"
                      >
                        {{ pokemon.name }}
                      </h3>
                    </v-card-title>
                  </nuxt-link>
                </v-card>
              </v-lazy>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex"
import SearchTypes from "@/components/filters/searchTypes.vue"
import SearchNames from "@/components/filters/searchNames.vue"
import SearchColors from "@/components/filters/searchColors.vue"
import PokemonColor from "@/components/pokemonColor.vue"
import SearchAbilities from "@/components/filters/SearchAbilities.vue"

export default {
  name: "HomePage",
  components: { SearchAbilities, SearchColors, SearchNames, SearchTypes, PokemonColor },
  data() { return { imageBaseURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' } },
  computed: { ...mapState('filters', ["error"]) },
  mounted() {
    this.setTypesFilter(this.$route.query.types ? this.$route.query.types.split(',') : [])
    this.setNameFilter(this.$route.query.name ? this.$route.query.name : null)
    this.setColorFilter(this.$route.query.color ? this.$route.query.color : null)
    this.setAbilityFilter(this.$route.query.abilities ? this.$route.query.abilities : null)
  },
  methods: {
    ...mapGetters('filters', ["getPokemons"]),
    ...mapMutations('filters', ["setTypesFilter", "setNameFilter", "setColorFilter", "setAbilityFilter"])
  }
}
</script>

<style>
</style>
