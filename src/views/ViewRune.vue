<template lang="pug">
div
  img(:src="getImgUrl(image)")
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
      // console.log(src);
      const imgURL = src.replace(/%2F/g, '/').replace(/%27/g, '\'');
      // return require(`../assets/images/${src}`);
      // eslint-disable-next-line global-require,import/no-dynamic-require
      return require(`../assets/images${imgURL}`);
    },
  },
};
</script>
