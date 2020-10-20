<template lang="pug">
#character-difficulty.mt-4
  .columns
    .column(
      v-for="(difficulty, i) in difficulties",
      :key="i",
      @mouseover="hoverSound()",
      @click="selectDifficulty(difficulty.name)"
    ).difficulty
      .banner(:class="difficulty.name.toLowerCase() + ' skills'")
      h1.title.is-1.has-text-pumpkin {{ difficulty.name.toUpperCase() }}
      p.has-text-white.has-background-grey
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CharacterDifficulty',
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
  computed: {
    ...mapGetters([
      'difficulties',
    ]),
  },
  methods: {
    ...mapActions([
      'pickDifficulty',
    ]),
    selectDifficulty(difficulty) {
      console.log(difficulty);
      this.pickDifficulty(difficulty);
      this.selectSound();
    },
  },
};
</script>

<style lang="scss" scoped>
.columns {
  display: inline-flex;
  width: 100%;
}
.difficulty {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  .banner {
    height: 82px;
    width: 33px;
    margin-bottom: 2em;
    transform: scale(1.5);

    &.casual {
      background-position: -1682px -2341px;
      height: 64px;
    }

    &.normal {
      background-position: -1672px -2810px;
      height: 74px;
    }

    &.heroic {
      background-position: -337px -1877px;
    }

    &.epic {
      background-position: -295px -3435px;
    }

    &.legendary {
      background-position: -228px -1368px;
    }
  }

  &:hover {
    filter: brightness(1.2)
  }
}
</style>
