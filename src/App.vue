<template lang="pug">
#app
  .container
    audio(ref="hover-sound").hover-sound
      source(src="./assets/sounds/menu_select.wav")
    audio(ref="select-sound").select-sound
      source(src="./assets/sounds/menu_selected.wav")
    Navbar(:hoverSound="hoverSound", :selectSound="selectSound")
    main.mt-3
      router-view
    footer.footer.mt-5
      p Game Version: {{ version }}
        span
          a(href="https://ll931217.github.io/", @mouseover="hoverSound()", @click="selectSound()") Liang-Shih Lin
</template>

<script>
import { mapGetters } from 'vuex';
import sounds from '@/mixins/sounds';

export default {
  name: 'App',
  mixins: [sounds],
  computed: {
    ...mapGetters({
      version: 'version',
      export: 'export',
    }),
  },
  components: {
    Navbar: () => import('@/components/Navbar.vue'),
  },
};
</script>

<style lang="sass">

*
  font-family: 'Arcade Classic'
  word-spacing: .5rem

body, html
  // background-image: url('https://cdn.cloudflare.steamstatic.com/steam/apps/375480/page_bg_generated_v6b.jpg?t=1598634326')
  background-image: url('./assets/images/page_bg.jpg')
  background-position: center top
  background-attachment: fixed
  background-repeat: no-repeat
  background-size: cover
  color: white

.navbar, main, .footer
  background-image: url('./assets/images/Tiled_brick.jpg')
  background-repeat: repeat
  background-size: 100px 100px
  box-shadow: 1px 1px 5px 2px black

footer
  span
    float: right

@font-face
  font-family: 'Arcade Classic'
  src: url('./assets/fonts/ARCADECLASSIC.TTF') format('truetype')
  font-style: normal
  font-weight: normal
  text-rendering: optimizeLegibility
</style>
