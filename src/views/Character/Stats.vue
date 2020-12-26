<template lang="pug">
.stats.px-3.py-3
  b-carousel(
    :autoplay="false",
    :indicator="indicator",
    :arrow="arrow",
    :icon-pack="iconPack",
    :icon-prev="iconPrev",
    :icon-next="iconNext"
  )
    b-carousel-item(v-for="(page, i) in sortedColumns" :key="i")
      section(class="hero is-medium")
        .columns
          .column
              p(v-for="(stat, f) in page.first", :key="f") {{ stat }}
          .column
              p(v-for="(stat, s) in page.second", :key="s") {{ stat }}
</template>

<script>
import dot from 'dot-object';
import { mapGetters } from 'vuex';

export default {
  name: 'Stats',
  data: () => ({
    arrow: true,
    iconPack: 'fas',
    iconPrev: 'chevron-left',
    iconNext: 'chevron-right',
    indicator: true,
  }),
  computed: {
    ...mapGetters([
      'stats',
    ]),
    statsSorted() {
      const app = this;
      const carousel = [[]];
      const breakPoint = 11;
      let counter = 0;

      Object.entries(this.stats).forEach(([statKey, statValue]) => {
        if (typeof statValue === 'object') {
          Object.entries(app.convertToDot({ [statKey]: statValue })).forEach(([dKey, dVal]) => {
            if (counter === breakPoint) {
              counter = 0;
              carousel.push([]);
            }
            carousel[carousel.length - 1].push(`${app.convertString(dKey)}: ${dVal}`);
            counter++;
          });
        } else {
          if (counter === breakPoint) {
            counter = 0;
            carousel.push([]);
          }

          let newKey = '';
          switch (statKey) {
            case 'healthRegen':
              newKey = 'HP Regen';
              break;
            case 'cooldownReduction':
              newKey = 'CD Reduction';
              break;
            case 'manaCostReduction':
              newKey = 'Cost Reduction';
              break;
            case 'bonusExp':
              newKey = 'Bonus XP';
              break;
            case 'potionEffectiveness':
              newKey = 'Potion Effect';
              break;
            default:
              newKey = statKey.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ').map((w) => w.trim().replace(/^\w/, (c) => c.toUpperCase())).join(' ');
          }

          carousel[carousel.length - 1].push(`${newKey}: ${statValue}`);
          counter++;
        }
      });

      return carousel;
    },
    sortedColumns() {
      const columns = [];

      this.statsSorted.forEach((stat, i) => {
        if (i % 2 === 0) {
          columns.push({ first: stat, second: [] });
        } else {
          columns[columns.length - 1].second = stat;
        }
      });

      return columns;
    },
    splitCamel(word) {
      return word.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    },
    capitalize(word) {
      console.log('capitalize:', word);
      return word.trim().replace(/^\w/, (c) => c.toUpperCase());
    },
  },
  methods: {
    convertToDot: (key) => dot.dot(key),
    convertString(val) {
      if (!val) return '';
      return val.split('.').map((v) => {
        let newVal = '';
        switch (v) {
          case 'damageElements':
            newVal = 'damage';
            break;
          case 'resistance':
            newVal = 'res';
            break;
          default:
            newVal = v;
        }
        return newVal;
      }).join(' ');
    },
  },
};
</script>

<style lang="scss" scoped>
.stats {
  background-color: black;
  grid-area: stats;

  .carousel {
    height: 100%;
  }
}
</style>
