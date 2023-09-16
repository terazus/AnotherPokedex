import colors from 'vuetify/es5/util/colors'


export default {
  target: 'static',
  ssr: true,
  head: {
    titleTemplate: '%s',
    title: 'Another PokeDex',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A PokeDex coded in 4h' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'og:title', content: 'Another PokeDex' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://terapokedex.netlify.app/' },
      { name: 'og:image', content: '' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
  },
  css: ["@/assets/styles/layout.css", "animate.css/animate.min.css"],
  plugins: ["@/plugins/particles"],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa'],
  axios: { baseURL: '/', headers: { common: { Accept: 'application/json' }}},
  pwa: { manifest: { lang: 'en' }},
  vuetify: {
    defaultAssets: { icons: 'fa' },
    theme: {
      dark: true,
        themes: {
          dark: {
            primary: colors.amber.darken2,
            accent: colors.red.darken1,
            secondary: colors.red.darken1,
            info: colors.blue.darken1,
            warning: colors.amber.darken1,
            error: colors.deepOrange.darken1,
            success: colors.green.darken1,
            extra: colors.yellow
          }
        }
    }
  },
  static: { prefix: false },
  srcDir: 'src/',
  build: { transpile: ['vue2-particles'] },
  generate: {
    routes: [...Array(1010).keys()].map(i => '/pokemons/' + (parseInt(i) + 1)),
    fallback: true
  }
}
