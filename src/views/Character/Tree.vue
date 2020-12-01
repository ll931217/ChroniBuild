<template lang="pug">
.tree(:class="tabs[selectedClass][selectedTab]")
  .row(v-for="(row, rowKey) in treeStructure", :key="rowKey")
    .col(v-for="([key, value], colKey) in row", :key="colKey")
      template(v-if="typeof value === 'object' && key !== 'None'")
        .skills.empty-skill(
          v-if="[\
            'Active Skill',\
            'Companion Skill',\
            'Heritage Skill',\
          ].indexOf(value.type) !== -1", :id="'skills-' + value.skill_requirement"
        )
        .skills(
          v-else,
          :class="key",
          :id="'skill-' + value.id",
        ) {{ value.id }}
</template>

<script>
import { mapGetters } from 'vuex';
import LeaderLine from 'leader-line-vue';

export default {
  name: 'Tree',
  props: {
    selectedClass: {
      type: String,
      default: '',
    },
    selectedTab: {
      type: Number,
      default: 0,
    },
    tabs: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    treeStructure: [],
    lines: [],
  }),
  computed: {
    ...mapGetters([
      'settings',
      'trees',
    ]),
  },
  watch: {
    selectedClass(val) {
      console.log('Class changed:', val);
      this.lines.forEach((line) => line.remove());

      this.createTreeStructure();
      this.attachRequiredSkills();
    },
    selectedTab(val) {
      console.log('Tab changed:', val);
      this.lines.forEach((line) => line.remove());

      this.createTreeStructure();
      this.attachRequiredSkills();
    },
  },
  mounted() {
    console.clear();
    const app = this;

    this.createTreeStructure();
    setTimeout(() => {
      app.attachRequiredSkills();
      console.log(app.$refs['skill-241']);
    }, 1000);
  },
  methods: {
    showRef(id) {
      console.log(this.$refs[`skill-${id}`]);
    },
    createTreeStructure() {
      this.treeStructure = [];
      const currentTabName = this.tabs[this.selectedClass][this.selectedTab];
      const treeItems = this.trees[this.selectedClass][currentTabName];

      for (let y = 0; y < 7; y++) { // Tree Columns
        const row = [];
        for (let x = 0; x < 10; x++) { // Tree Rows
          const skillFound = Object.entries(treeItems)
            .filter((tree) => tree[0] !== 'None')
            .find((ti) => (
              parseInt(ti[1].x, 10) === x && parseInt(ti[1].y, 10) === y
            ));
          if (skillFound) {
            row.push(skillFound);
          } else {
            row.push([]);
          }
        }
        this.treeStructure.push(row);
      }
    },
    attachRequiredSkills() {
      const app = this;

      this.treeStructure.forEach((row) => {
        console.log('row:', row);
        row.forEach(([key, value]) => {
          if (typeof value === 'object' && value.skill_requirement !== 'none') {
            const requirements = JSON.parse(value.skill_requirement);
            console.log(key, value.id);
            console.log('Requirements:', requirements);

            requirements.forEach((req) => {
              // const start = app.$refs[`skill-${req}`];
              const start = document.getElementById(`skill-${req}`);
              const end = document.getElementById(`skill-${value.id}`);

              if (start && end) {
                console.log('Start:', start, typeof start);
                console.log('End:', end, typeof end);
                app.lines.push(LeaderLine.setLine(
                  start,
                  end,
                  { color: '#3498db', path: 'straight', endPlug: 'behind' },
                ));
              }
            });
            console.log('========================================');
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tree {
  // background-image: url(../../assets/images/skills_bg.png);
  border-right: 5px dashed rgb(182, 131, 61);
  border-bottom: 5px dashed rgb(182, 131, 61);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 2px solid white;
  border-left: 2px solid white;
  grid-area: tree;
  z-index: 10;

  .row {
    display: flex;
    justify-content: space-between;
    flex: 1 1 0px;
    align-items: center;

    .col {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1 1 0px;

      div {
        border: 1px solid white;
        height: 24px;
        width: 24px;
        transform: scale(1.6)
      }

      .empty-skill {
        background-position: -3699px -1033px;
      }

      .empty-heritage {
        background-position: -2801px -1034px;
      }

      .empty-passive {
        background-position: -2182px -1035px;
      }
    }
  }
}
</style>
