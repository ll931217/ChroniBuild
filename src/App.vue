<template lang="pug">
#app
  .container
    b-navbar
      template(slot="brand")
        b-navbar-item(tag="router-link", :to="{ name: 'home' }")
          img(src="./assets/logo.png")
      template(slot="start")
        b-navbar-item(tag="router-link", :to="{ name: 'home' }") Home
        b-navbar-item(:to="{ name: 'items' }") Items
        b-navbar-item(:to="{ name: 'runes' }") Runes
        b-navbar-item(:to="{ name: 'About' }") About
    main
      router-view
    footer
      p Game Version: {{ gameVersion }}
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    gameVersion: '',
    tree: {},
  }),
  async created() {
    const skillData = await import('@/assets/skilldatas/skilldata_1.00.4.json');
    this.gameVersion = skillData.version;
    this.tree = skillData.tree;
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

@font-face
  font-family: 'Arcade Classic'
  src: url('./assets/fonts/ARCADECLASSIC.TTF') format('truetype')
  font-style: normal
  font-weight: normal
  text-rendering: optimizeLegibility
</style>
