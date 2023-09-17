<template>
  <v-app>
    <v-app-bar
      clipped-left
      app
      class="elevation-0 primary"
      height="64"
      style="z-index: 10"
    >
      <NavigationHeader />
    </v-app-bar>
    <v-main>
      <client-only>
        <Particles
          id="particles"
          :particles-init="particlesInit"
          :options="options"
          style="width:50%"
        />
      </client-only>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { loadFull } from "tsparticles"
import NavigationHeader from "@/components/navigation/header.vue"

const particlesInit = async engine => { await loadFull(engine); };

export default {
  name: 'DefaultLayout',
  components: { NavigationHeader },
  data () {
    return {
      drawer: false,
      fixed: false,
      particlesInit
    }
  },
  computed: {
    options: {
      get() {
        return {
          pauseOnOutsideViewport: true,
          background: {
            color: {
              value: 'transparent'
            }
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#FFEB3B"
            },
            links: {
              color: "#FFEB3B",
              distance: 130,
              enable: true,
              opacity: 0.4
            },
            collisions: {
              enable: true
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: 'bounce',
              random: false,
              speed: 1,
              straight: false
            },
            number: {
              density: {
                enable: true,
                value_area: 800
              },
              value: 50
            },
            opacity: {
              value: 1
            },
            shape: {
              type: null
            },
            size: {
              random: true,
              value: 5
            }
          },
          detectRetina: true
        }
      }
    }
  }
}
</script>

<style>
  html {
    font-size: 20px;
    scrollbar-color: #FFA000 #E0E0E0;
  }
  a {
    text-decoration: none !important;
  }
</style>
