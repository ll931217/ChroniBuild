<template lang="pug">
#character-selection
  section.mx-2.my-2
    b-tabs(v-model="activeTab", position="is-centered", size="is-large")
      b-tab-item(
        v-for="(char, i) in classes",
        :label="char.name", :key="i",
      )
        .columns
          .column
            .columns
              .column.is-one-fifth
                .icon(:class="char.name.toLowerCase() + ' skills'").mx-2.my-2
              .column.characterClass
                h1.title.is-1(:class="'has-text-' + char.name.toLowerCase()") {{ char.name }}
            .columns
              .column
                h3.title.is-3(:class="'has-text-' + char.name.toLowerCase()") Stats
                .bars
                  div(
                    v-for="([barKey, barValue], h) in Object.entries(char.bars)",
                    :key="h",
                    :class="barKey")
                    h3.title.is-4.has-text-white.mb-2.mt-2 {{ barKey }}
                    b-progress(
                      :value="barValue",
                      size="is-large",
                      :type="'is-' + char.name.toLowerCase()").bar
            .columns
              .column
                h3.title.is-3(:class="'has-text-' + char.name.toLowerCase()") Perks
                .content
                  ul.perks.is-size-4
                    li(v-for="(perk, j) in char.perks", :key="j") {{ perk }}
          .column.is-align-items-center
            h3.title.is-3(:class="'has-text-' + char.name.toLowerCase()") Description
            .description
              p(v-for="(desc, k) in char.description", :key="k").is-size-4 {{ desc }}
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
  watch: {
    activeTab: {
      handler: 'selectClass',
      immediate: true,
    },
  },
  methods: {
    ...mapActions([
      'pickClass',
    ]),
    selectClass() {
      const selection = Object.entries(this.classes)[this.activeTab][1];
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
  .progress-wrapper.bar {
    progress.progress {
      border-radius: 0;
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
