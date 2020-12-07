<template lang="pug">
#navbar
  b-navbar(:transparent="true", :centered="true")
    template(slot="brand")
      b-navbar-item(tag="router-link", :to="{ name: 'Home' }")
        img(src="../assets/images/logo.png")
    template(slot="start", :centered="true")
      b-navbar-item(
        tag="router-link",
        :to="{ name: 'Home' }",
        @mouseover.native="hoverSound()",
        @click.native="selectSound()"
      ).has-text-white Home
      b-navbar-item(
        tag="router-link",
        :to="{ name: 'Items' }",
        @mouseover.native="hoverSound()",
        @click.native="selectSound()"
      ).has-text-white Items
      b-navbar-item(
        tag="router-link",
        :to="{ name: 'Runes' }",
        @mouseover.native="hoverSound()",
        @click.native="selectSound()"
      ).has-text-white Runes
      b-navbar-item(
        tag="router-link",
        :to="{ name: 'Scrolls' }",
        @mouseover.native="hoverSound()",
        @click.native="selectSound()"
      ).has-text-white Scrolls
      b-navbar-item(
        tag="router-link",
        :to="{ name: 'About' }",
        @mouseover.native="hoverSound()",
        @click.native="selectSound()"
      ).has-text-white About
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    hoverSound: {
      type: Function,
      default: () => {},
    },
    selectSound: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="sass">
@import "~bulma/sass/utilities/_all"

.navbar

  .navbar-menu
    .navbar-start
      width: 100% !important

      .navbar-item
        border: 1px solid white
        border-top: 0
        border-bottom: 0
        flex-grow: 1
        font-weight: bold
        justify-content: center

        &:last-child
          border-right: 0

        &:hover
          color: $primary !important
          border-style: outset
          border-width: 0 3px 3px 0
</style>
