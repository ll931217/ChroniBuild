<template lang="pug">
#character-selection
  h1.title.is-1.has-text-white.mb-0.ml-3 Pick a class
  .columns
    .column
      section.mx-2.my-2
        b-tabs(v-model="activeTab")
          b-tab-item(v-for="(char, i) in classes", :label="char.name", :key="i")
            .columns
              .column
                .columns
                  .column.is-one-fifth
                    .icon(:class="char.name.toLowerCase() + ' skills'").mx-2.my-2
                  .column.characterClass
                    h1.title.is-1.has-text-white {{ char.name }}
                .columns
                  .column
                    h3.title.is-3.has-text-warning Stats
                    .bars
                      div(
                        v-for="([barKey, barValue], h) in Object.entries(char.bars)",
                        :key="h",
                        :class="barKey")
                        h3.title.is-4.has-text-white.mb-2.mt-2 {{ barKey }}
                        // .bar(:style="{ width: barValue + '%' }")
                        b-progress(:value="barValue")
                .columns
                  .column
                    h3.title.is-3.has-text-warning Perks
                    .content
                      ul.perks.is-size-4
                        li(v-for="(perk, j) in char.perks", :key="j") {{ perk }}
              .column.is-align-items-center
                h3.title.is-3.has-text-warning Description
                .description
                  p(v-for="(desc, k) in char.description", :key="k").is-size-4 {{ desc }}
  .columns
    .column.is-justify-content-center.steps-buttons
      b-button(type="light", @click="createBuild") Create Build
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CharacterSelection',
  data: () => ({
    activeTab: 0,
  }),
  computed: {
    ...mapGetters([
      'classes',
    ]),
  },
  methods: {
    ...mapActions([
      'pickClass',
    ]),
    createBuild() {
      const selection = Object.entries(this.classes)[this.activeTab][1];
      console.log(selection);
      this.pickClass(selection.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  height: 54px;
  width: 54px;
  transform: scale(1.5);

  &.templar {
    background-position: -102px -2610px;
  }

  &.berserker {
    background-position: -118px -2059px;
  }

  &.warden {
    background-position: -110px -3702px;
  }

  &.warlock {
    background-position: -120px -367px;
  }
}

.bars {
  > .div {
    border: 1px solid white;
    height: 20px;
    position: relative;

    .bar {
      background-color: white;
      position: absolute;
    }
  }
}

.characterClass {
  display: flex;
  align-items: center;
}

.steps-buttons {
  display: flex;
  justify-content: center;
}
</style>
