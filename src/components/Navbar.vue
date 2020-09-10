<template lang="pug">
#navbar
  b-navbar(:transparent="true", :centered="true")
    template(slot="brand")
      b-navbar-item(tag="router-link", :to="{ name: 'Home' }")
        img(src="../assets/images/logo.png")
    template(slot="start", :centered="true")
      b-navbar-item(tag="router-link", :to="{ name: 'Home' }").has-text-white Home
      b-navbar-item(tag="router-link", :to="{ name: 'Items' }").has-text-white Items
      b-navbar-item(tag="router-link", :to="{ name: 'Runes' }").has-text-white Runes
      b-navbar-item(tag="router-link", :to="{ name: 'About' }").has-text-white About
</template>

<style lang="sass">
@import "~bulma/sass/utilities/_all"

.navbar
  background-image: url('../assets/images/Tiled_brick.jpg')
  background-repeat: repeat
  background-size: 100px 100px
  box-shadow: 1px 1px 5px 2px black

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
