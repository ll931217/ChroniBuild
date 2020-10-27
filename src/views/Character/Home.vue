<template lang="pug">
#character-home
  planner(:hoverSound="hoverSound", :selectSound="selectSound")
</template>

<script>
import Planner from './Planner.vue';

export default {
  name: 'CharacterHome',
  title: 'Character Planner',
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
  data: () => ({
    activeStep: 0,
  }),
  components: {
    Planner,
  },
};
</script>

<style lang="scss">
.tabs {
  a {
    color: white;
  }
}

.skills {
  background-image: url(../../assets/images/skills.png);
}
</style>
