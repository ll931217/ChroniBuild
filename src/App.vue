<template lang="pug">
#app
  .container
    Navbar
    main
      router-view
    footer
      p Game Version: {{ gameVersion }}
        span By&nbsp;
          a(href="https://ll931217.github.io/") Liang-Shih Lin
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
