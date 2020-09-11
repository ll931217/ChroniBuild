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
    footer
      p Game Version: {{ gameVersion }}
        span
          a(href="https://ll931217.github.io/", @mouseover="hoverSound()", @click="selectSound()") Liang-Shih Lin
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    gameVersion: '',
    tree: {},
  }),
  async created() {
    const skillData = await import('@/assets/skilldata.json');
    this.gameVersion = skillData.version;
    this.tree = skillData.tree;

    const hoverResponse = this.$refs['hover-sound'].canPlayType('audio/wav');
    const selectResponse = this.$refs['select-sound'].canPlayType('audio/wav');
    console.log(hoverResponse);
    console.log(selectResponse);
  },
  methods: {
    hoverSound() {
      this.$refs['hover-sound'].load();
      this.$refs['hover-sound'].play();
    },
    selectSound() {
      this.$refs['select-sound'].load();
      this.$refs['select-sound'].play();
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
  background-image: url('https://cdn.cloudflare.steamstatic.com/steam/apps/375480/page_bg_generated_v6b.jpg?t=1598634326')
  background-position: center top
  background-attachment: fixed
  background-repeat: no-repeat
  background-size: cover
  color: white

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
