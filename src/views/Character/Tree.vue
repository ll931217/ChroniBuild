<template lang="pug">
.tree(:class="tabs[selectedClass][selectedTab]")
  .skill-select(ref="skill-select", v-show="skillSelectShow")
    h1 Skill Select Menu
  .row(v-for="(row, rowKey) in treeStructure", :key="rowKey")
    .col(v-for="(col, colKey) in row", :key="colKey")
      template(v-if="col.length > 0")
        Skill(
          :single="col.length === 1",
          :skills="col",
          :row="rowKey",
          :col="colKey",
          :tree="treeStructure",
          @mousemove="mouseMove",
          @toggleSkillSelect="toggleSkillSelect"
        )
</template>

<script>
import { mapGetters } from 'vuex';
import LeaderLine from 'leader-line-vue';

import Skill from './Skill.vue';

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
    skillSelectShow: false,
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
      const app = this;

      this.lines.forEach((line) => line.remove());
      this.lines.length = 0;

      this.createTreeStructure();
      if (this.selectedTab !== 4) {
        setTimeout(() => {
          app.attachRequiredSkills();
        }, 500);
      }
    },
    selectedTab(val) {
      const app = this;

      this.lines.forEach((line) => line.remove());
      this.lines.length = 0;

      this.createTreeStructure();
      if (val !== 4) {
        setTimeout(() => {
          app.attachRequiredSkills();
        }, 500);
      }
    },
  },
  mounted() {
    const app = this;

    this.createTreeStructure();
    if (this.selectedTab !== 4) {
      setTimeout(() => {
        app.attachRequiredSkills();
      }, 500);
    }
  },
  methods: {
    mouseMove(event) {
      const tree = document.querySelector('.tree');
      const rect = tree.getBoundingClientRect();

      const x = `${event.clientX - rect.x}px`;
      const y = `${event.clientY - rect.y}px`;

      this.$refs['skill-select'].style.left = x;
      this.$refs['skill-select'].style.top = y;
    },
    toggleSkillSelect(state) {
      this.skillSelectShow = state;
    },
    selectSkill(skillIDs) {
      const eleID = `skill-${skillIDs.sort((a, b) => a - b).join('_')}`;
      const ele = document.getElementById(eleID);
      if (ele) {
        const position = ele.getBoundingClientRect();
        const x = position.left;
        const y = position.top;

        console.log('Skills:', skillIDs, position, x, y);
        console.log(
          ele.dataset.row,
          ele.dataset.col,
          this.treeStructure[ele.dataset.row][ele.dataset.col],
        );
      } else {
        console.error('selectSkill: Element not found');
      }
    },
    createTreeStructure() {
      this.treeStructure = [];
      const currentTabName = this.tabs[this.selectedClass][this.selectedTab];
      const treeItems = this.trees[this.selectedClass][currentTabName];

      for (let y = 0; y < 7; y++) { // Tree Columns
        const row = [];
        for (let x = 0; x < 10; x++) { // Tree Rows
          const skillFound = Object.entries(treeItems)
            .filter((tree) => (
              tree[0] !== 'None'
              && parseInt(tree[1].x, 10) === x
              && parseInt(tree[1].y, 10) === y
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
        row.filter((col) => col.length > 0).forEach((col) => {
          col.filter((skill) => skill[1].skill_requirement !== 'none').forEach((skill) => {
            const requirements = JSON.parse(skill[1].skill_requirement).sort((a, b) => a - b);

            const start = document.getElementById(`skill-${requirements.join('_')}`);
            const end = document.getElementById(`skill-${skill[1].id}`);

            if (start && end) {
              const line = LeaderLine.setLine(
                start,
                end,
                { color: '#3498db', path: 'straight', endPlug: 'behind' },
              );
              app.lines.push(line);
            }
          });
        });
      });
    },
  },
  components: {
    Skill,
  },
};
</script>

<style lang="scss" scoped>
.tree {
  border-right: 5px dashed rgb(182, 131, 61);
  border-bottom: 5px dashed rgb(182, 131, 61);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 2px solid white;
  border-left: 2px solid white;
  grid-area: tree;
  z-index: 10;
  position: relative;
  user-select: none;

  .skill-select {
    background-color: rgba($color: #000000, $alpha: 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
  }

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
    }
  }
}
</style>
