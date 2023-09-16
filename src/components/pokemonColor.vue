<template>
  <div
    class="circle"
    :style="getPokemonColorCSS()"
  />
</template>

<script>
export default {
  name: "PokemonColor",
  props: {
    color: {
      type: String,
      required: true
    }
  },
  methods: {
    getPokemonColorCSS(){
      return `background-color: ${this.color}; border-radius: 50%; width: 30px; height: 30px;`
    }
  }
}
</script>

<style scoped>

</style>
