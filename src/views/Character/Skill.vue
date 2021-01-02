<template lang="pug">
.skill-comp
  template(v-if="single")
    .skills.skill(
      :class="{\
        [skills[0][0].split(' ').join('_')]: true,\
        'spec-passive': row === 3 && col === 0\
      }",
      :id="'skill-' + skills[0][1].id",
      :data-row="row",
      :data-col="col",
      :data-requirement="skills[0][1].skill_requirement",
      @mousemove="onMousemove",
      @mouseover="$emit('toggleSkillSelect', true)",
      @mouseleave="$emit('toggleSkillSelect', false)",
    ) {{ skills[0][1].id }}
  template(v-else)
    .skills.empty-skill(
      v-if="[\
        'Active Skill',\
        'Companion Skill',\
        'Heritage Skill',\
      ].indexOf(skills[0][1].type) !== -1",
      :id="'skill-' + skills.map((c) => parseInt(c[1].id)).sort((a, b) => a - b).join('_')",
      :data-row="row",
      :data-col="col",
      @click="showCoords(skills.map((c) => parseInt(c[1].id)).sort((a, b) => a - b).join('_'))",
      @contextmenu.prevent="selectSkill(skills.map((c) => parseInt(c[1].id)))",
      @mouseover="$emit('toggleSkillSelect', true)",
      @mouseleave="$emit('toggleSkillSelect', false)",
    )
</template>

<script>
export default {
  name: 'Skill',
  props: {
    single: {
      type: Boolean,
      default: () => false,
    },
    skills: {
      type: Array,
      default: () => [],
    },
    tree: {
      type: Array,
      default: () => [],
    },
    row: {
      type: Number,
      default: 0,
    },
    col: {
      type: Number,
      default: 0,
    },
    mouseMove: {
      type: Function,
      default: () => {},
    },
    toggleSkillSelect: {
      type: Function,
      default: () => false,
    },
  },
  methods: {
    onMousemove(event) {
      this.$emit('mousemove', event);
    },
    showCoords(id) {
      const ele = document.getElementById(`skill-${id}`);
      const position = ele.getBoundingClientRect();
      const x = position.left;
      const y = position.top;
      console.log('showCoords[ele]:', ele, position, x, y);
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
          this.tree[ele.dataset.row][ele.dataset.col],
        );
      } else {
        console.error('selectSkill: Element not found');
      }
    },
  },
};
</script>

<style lang="scss">
.skill-comp {
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
</style>
