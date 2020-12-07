<template lang="pug">
.gears
  .items
    div(v-for="type in itemTypes", :class="type")
      .item.skills
      .options
        .enchant.skills(@mouseover="hoverSound()", @click="selectSound()")
        .reroll.skills(@mouseover="hoverSound()", @click="scrambleSlots(type)")
      .gems
        .slot(v-for="slot in gems[type]", :class="slot")
</template>

<script>
export default {
  name: 'Gears',
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
    itemTypes: ['helm', 'accessory', 'amulet', 'offhand', 'chest', 'weapon', 'boot', 'ring'],
    gemTemplates: {
      one: {
        items: ['accessory', 'offhand', 'boot', 'ring'],
        template: [
          ['pentagon', '', ''],
          ['square', '', ''],
          ['circle', '', ''],
        ],
      },
      two: {
        items: ['helm', 'amulet', 'weapon'],
        template: [
          ['pentagon', '', ''],
          ['square', 'square', ''],
          ['square', 'circle', ''],
          ['circle', 'circle', ''],
        ],
      },
      three: {
        items: ['chest'],
        template: [
          ['pentagon', 'pentagon', ''],
          ['pentagon', 'square', 'square'],
          ['pentagon', 'square', 'circle'],
          ['pentagon', 'circle', 'circle'],
          ['square', 'square', 'square'],
          ['square', 'square', 'circle'],
          ['square', 'circle', 'circle'],
          ['circle', 'circle', 'circle'],
        ],
      },
    },
    gems: {
      helm: [],
      accessory: [],
      amulet: [],
      offhand: [],
      chest: [],
      weapon: [],
      boot: [],
      ring: [],
    },
  }),
  created() {
    this.itemTypes.forEach(this.scrambleSlots);
  },
  methods: {
    scrambleSlots(type) {
      this.selectSound();

      const app = this;

      Object.keys(this.gemTemplates).forEach((key) => {
        if (app.gemTemplates[key].items.find((i) => i === type)) {
          const template = [...app.gemTemplates[key].template];
          app.gems[type] = template[Math.round(Math.random() * (template.length - 1))];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  .true-legendary {
    color: #AE5D41;
  }
}

.skill {
  color: white;
  .name {
    color: #A98A71;
  }
}

.gears {
  grid-area: gears;
  // border-top: 5px dashed rgb(182, 131, 61);
  border-bottom: 5px dashed rgb(182, 131, 61);
  border-left: 5px dashed rgb(182, 131, 61);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.5em;

  .items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    transform: scale(1.3);

    &> div {
      display: grid;
      grid-template-columns: 26px 52px;
      grid-template-rows: repeat(2, 26px);
      grid-template-areas:
        'item options'
        'gems gems';
      border: 2px inset white;

      &> .item {
        grid-area: item;
      }

      &> .options {
        grid-area: options;
        display: inline-flex;

        > div {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
        }

       .enchant {
          background-position: -3832px -1146px;
          border-right: 2px solid white;
        }

        .reroll {
          background-position: -2749px -1136px;
        }
      }

      &> .item, &> .options {
        border: 1px solid white;
      }

      &> .gems {
        grid-area: gems;
        display: inline-flex;

        .slot {
          // border: 1px solid white;
          flex: 1 1 0px;
        }

        .square {
          background-image: url(../../assets/images/square.png);
          background-size: cover;
        }

        .pentagon {
          background-image: url(../../assets/images/pentagon.png);
          background-size: cover;
        }

        .circle {
          background-image: url(../../assets/images/circle.png);
          background-size: cover;
        }
      }
    }

    .helm .item {
      background-position: -3120px -1042px;
    }
    .accessory .item {
      background-position: -2097px -1045px;
    }
    .amulet .item {
      background-position: -3216px -1042px;
    }

    .offhand .item {
      background-position: -2356px -1041px;
    }

    .chest .item {
      background-position: -3644px -1042px;
    }

    .weapon .item {
      background-position: -2234px -1045px;
    }

    .boot .item {
      background-position: -3522px -1041px;
    }

    .ring .item {
      background-position: -3548px -1041px;
    }
  }
}
</style>
