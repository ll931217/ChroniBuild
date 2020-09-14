<template lang="pug">
#app
  .container
    audio(ref="hover-sound").hover-sound
      source(src="./assets/sounds/menu_select.wav")
    audio(ref="select-sound").select-sound
      source(src="./assets/sounds/menu_selected.wav")
    Navbar(:hoverSound="hoverSound", :selectSound="selectSound")
    main.mt-3.pl-4
      router-view
    footer.footer.mt-5
      p Game Version: {{ version }}
        span
          a(href="https://ll931217.github.io/", @mouseover="hoverSound()", @click="selectSound()") Liang-Shih Lin
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      version: 'version',
      export: 'export',
    }),
  },
  created() {
    // const hoverResponse = this.$refs['hover-sound'].canPlayType('audio/wav');
    // const selectResponse = this.$refs['select-sound'].canPlayType('audio/wav');
    // console.log(hoverResponse);
    // console.log(selectResponse);
    console.log(this.export);
  },
  methods: {
    hoverSound() {
      const key = 'hover-sound';

      this.$refs[key].load();
      this.$refs[key].volume = 0.5;
      this.$refs[key].play();
    },
    selectSound() {
      const key = 'select-sound';

      this.$refs[key].load();
      this.$refs[key].volume = 0.2;
      this.$refs[key].play();
    },
  },
  components: {
    Navbar: () => import('@/components/Navbar.vue'),
  },
};
</script>

<style lang="sass">

*
  font-family: 'Arcade Classic'

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
