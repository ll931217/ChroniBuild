<template lang="pug">
#character-planner
  .container
    .columns.is-gapless.is-mobile.mb-1
      .column
        .character
          Stats
          Gears(:hoverSound="hoverSound", :selectSound="selectSound")
          .header
            .selected-class
              .avatar(:class="settings.characterClass.toLowerCase() + ' skills'")
              h1.title.is-2.name(
                :class="'has-text-' + settings.characterClass.toLowerCase()"
              ) {{ settings.characterClass }}
            .details
              .char-stats
                span.level Lv. 100
                span.mastery-points , M {{ points.mastery }}
              span.skill-points SP: {{ points.skill }}
            .selection
              b-field.class
                b-select(placeholder="Pick a class", v-model="selectedClass", size="is-small")
                  option(
                    v-for="(cls, i) in classes",
                    :value="cls.name",
                    :key="i"
                  ) {{ cls.name }}
              b-field.difficulty
                b-select(
                  placeholder="Pick difficulty",
                  v-model="selectedDifficulty",
                  size="is-small"
                )
                  option(
                    v-for="(diff, i) in difficulties",
                    :value="diff.name",
                    :key="i"
                  ) {{ diff.name }}
            .tree-list
              .tree-tab.skills(
                v-for="(tab, tabIndex) in tabs[selectedClass]",
                @mouseover="hoverSound()",
                @click="selectTab(tabIndex)",
                :id="[combine(tab.toLowerCase())]",
                :class="{ disabled: selectedTab !== tabIndex, selected: selectedTab === tabIndex }"
              )
          Tree(:selectedClass="selectedClass", :selectedTab="selectedTab", :tabs="tabs")

    .columns.is-centered
      .column
        h1.title.is-1.has-text-white.mb-0.ml-3 Guide
        textarea.textarea.has-fixed-size.guide-textarea(
          placeholder="Type your guide here",
          v-model="guide"
        )
    .columns.is-centered
      .column
        b-button(type="is-success", @click="exportData()") Export
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Gears from './Gears.vue';
import Tree from './Tree.vue';
import Stats from './Stats.vue';

export default {
  name: 'CharacterPlanner',
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
    selectedClass: '',
    selectedDifficulty: '',
    selectedTree: {},
    selectedTab: 0,
    guide: '',
    tabs: {
      Templar: ['Vengeance', 'Wrath', 'Conviction', 'Redemption', 'Mastery'],
      Berserker: ['Guardian', 'Sky Lord', 'Dragonkin', 'Frostborn', 'Mastery'],
      Warden: ['Wind Ranger', 'Druid', 'Storm Caller', 'Winter Herald', 'Mastery'],
      Warlock: ['Corruptor', 'Lich', 'Demonologist', 'Reaper', 'Mastery'],
    },
  }),
  watch: {
    selectedClass: {
      handler: function handler(val) {
        if (val === '') {
          this.selectedClass = this.classes[0].name;
        } else {
          this.pickClass(val);
        }
        this.selectedTree = this.trees[this.selectedClass];
      },
      immediate: true,
    },
    selectedDifficulty: {
      handler: function handler(val, oldVal) {
        if (val === '') {
          this.selectedDifficulty = this.difficulties[this.difficulties.length - 1].name;
        } else {
          this.restoreDifficulty(oldVal);
          this.pickDifficulty(val);
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters([
      'classes',
      'difficulties',
      'points',
      'settings',
      'trees',
    ]),
  },
  methods: {
    ...mapActions([
      'pickClass',
      'pickDifficulty',
      'restoreDifficulty',
    ]),
    async exportData() {
      console.log(await this.editor.save());
    },
    selectTab(tab) {
      this.selectSound();
      this.selectedTab = tab;
    },
    combine(key) {
      return key.split(' ').join('_');
    },
  },
  components: {
    Gears,
    Tree,
    Stats,
  },
};
</script>

<style lang="scss">
.select select {
  background: gray;
  border: none;
  border-radius: 0;
  color: white;
  font-weight: bold;

  option {
    color: white;
  }
}

.select:not(.is-multiple):not(.is-loading)::after {
  border-color: yellow;
}

.guide-textarea {
  background-color: rgba($color: #bbb, $alpha: 1.0);
  height: 300px;
  width: 100%;
}

.character {
  background-image: url(../../assets/images/skills_bg.png);
  display: grid;
  height: 400px;
  grid-template-columns: 3fr repeat(3, 2fr);
  grid-template-rows: 85px auto;
  grid-template-areas:
    "stats header header header"
    "stats gears tree tree";

  .disabled {
    filter: brightness(.4);
  }

  > .circle {
    height: 22px;
    width: 22px;
    border-radius: 50%;
  }

  > .square {
    height: 26px;
    width: 26px;
  }

  .header {
    grid-area: header;

    background-image: url(../../assets/images/skills_bg.png);
    border-right: 5px dashed rgb(182, 131, 61);
    border-left: 5px dashed rgb(182, 131, 61);
    border-top: 5px dashed rgb(182, 131, 61);
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 4fr 1fr 1fr 4fr;
    grid-template-areas:
      "selected selected selected selection selection details details"
      "selected selected selected selection selection details details"
      "selected selected selected . . . ."
      "selected selected selected tree-list . . .";

    .selected-class {
      grid-area: selected;
      display: inline-flex;
      justify-content: space-around;
      align-items: center;
      flex-grow: 1;

      .avatar {
        height: 54px;
        width: 54px;

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
    }

    .details {
      grid-area: details;

      display: flex;
      flex-direction: column;
      padding: 0 1.5em;

      .char-stats {
        display: inline-flex;

        .level {
          margin: 0;
        }
      }
    }

    .selection {
      grid-area: selection;
      display: inline-flex;

      .class {
        margin: 0;
        padding: 0 1em;
      }

      .difficulty {
        margin: 0;
        padding: 0 1em;
      }
    }

    .tree-list {
      grid-area: tree-list;
      display: flex;
      justify-content: space-around;
      margin-bottom: -5px;
      padding: 0 1em;
      width: 200px;
      transform: scale(1.2);

      .tree-tab {
        border: 2px solid white;
        cursor: pointer;
        height: 30px;
        width: 30px;
        box-shadow: 2px 2px 5px black;

        &.selected {
          z-index: 11;
        }

        &#mastery {
          background-position: -2596px -1146px;
        }

        // BERSERKER
        &#guardian {
          background-position: -2941px -1147px;
        }

        &#sky_lord {
          background-position: -2180px -1147px;
        }

        &#dragonkin {
          background-position: -3188px -1146px;
        }

        &#frostborn {
          background-position: -3578px -1144px;
        }

        // TEMPLAR
        &#vengeance {
          background-position: -2331px -1147px;
        }

        &#wrath {
          background-position: -2084px -1143px;
        }

        &#conviction {
          background-position: -3082px -1144px;
        }

        &#redemption {
          background-position: -2915px -1144px;
        }

        // WARDEN
        &#wind_ranger {
          background-position: -2775px -1147px;
        }

        &#druid {
          background-position: -2648px -1145px;
        }

        &#storm_caller {
          background-position: -2433px -1144px;
        }

        &#winter_herald {
          background-position: -3162px -1145px;
        }

        // WARLOCK
        &#corruptor {
          background-position: -3482px -1143px;
        }

        &#lich {
          background-position: -3916px -1253px;
        }

        &#demonologist {
          background-position: -2718px -1147px;
        }

        &#reaper {
          background-position: -2570px -1146px;
        }
      }
    }
  }
}
</style>
