<template lang="pug">
.stats.p-3
  h3.title.has-text-white.is-4 Stats
  b-carousel(
    :autoplay="false",
    :indicator="indicator",
    :arrow="arrow",
    :icon-pack="iconPack",
    :icon-prev="iconPrev",
    :icon-next="iconNext"
  )
    b-carousel-item(v-for="(carousel, i) in carousels" :key="i")
      section(:class="`hero is-medium `")
        .hero-body.has-text-centered
          h1.title.has-text-white {{ carousel.text }}
</template>

<script>
export default {
  name: 'Stats',
  data: () => ({
    arrow: true,
    iconPack: 'fas',
    iconPrev: 'chevron-left',
    iconNext: 'chevron-right',
    indicator: false,
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
