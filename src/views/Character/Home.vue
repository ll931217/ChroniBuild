<template lang="pug">
#character-home.pt-5
  b-steps(
    v-model="activeStep",
    type="is-danger"
  )
    b-step-item(step="1", label="Pick a class", :clickable="false")
      selection
    b-step-item(step="2", label="Pick difficulty", :clickable="false")
      difficulty(:hoverSound="hoverSound", :selectSound="selectSound")
    b-step-item(step="3", label="Planner", :clickable="false")
      planner(:hoverSound="hoverSound", :selectSound="selectSound")
    template(
      slot="navigation",
      slot-scope="{previous, next}"
    )
      b-button(
        type="is-light",
        icon-pack="mdi",
        icon-left="chevron-left",
        @click.prevent="previous.action"
      ).ml-2.mb-2
      b-button(
        type="is-light",
        icon-pack="mdi",
        icon-left="chevron-right",
        @click.prevent="next.action"
      ).mb-2
</template>

<script>
import Selection from './Selection.vue';
import Difficulty from './Difficulty.vue';
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
    Selection,
    Difficulty,
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

.step-title {
  color: white;
}
</style>
