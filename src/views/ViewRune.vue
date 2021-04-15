<template lang="pug">
#view-rune
  img(v-if="image !== ''", :src="getImgUrl(image)")
</template>

<script>
export default {
  name: 'Rune',
  props: {
    image: {
      type: String,
      default: '',
    },
  },
  methods: {
    getImgUrl(src) {
      const imgURL = src.replace(/%2F/g, '/').replace(/%27/g, '\'');
      // eslint-disable-next-line global-require,import/no-dynamic-require
      return require(`@/assets/images${imgURL}`);
    },
  },
};
</script>

<style lang="sass">
#view-rune
  display: flex
  align-items: center

  img
    transform: scale(1.3)
</style>
