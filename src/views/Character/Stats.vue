<template lang="pug">
.stats
  h3.title.is-4 Stats
  b-carousel(:autoplay="false")
    b-carousel-item(v-for="(carousel, i) in carousels" :key="i")
      section(:class="`hero is-medium is-${carousel.color}`")
        .hero-body.has-text-centered
          h1.title {{ carousel.text }}
</template>

<script>
export default {
  name: 'Stats',
  data: () => ({
    carousels: [
      { text: 'Slide 1', color: 'primary' },
      { text: 'Slide 2', color: 'info' },
      { text: 'Slide 3', color: 'success' },
      { text: 'Slide 4', color: 'warning' },
      { text: 'Slide 5', color: 'error' },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.stats {
  background-color: black;
  grid-area: stats;
}
</style>
