<template lang="pug">
.tree
  .0_0
  .1_0
  .2_0
  .3_0
  .4_0
  .5_0
  .6_0
  .7_0
  .8_0
  .9_0

  .0_1
  .1_1
  .2_1
  .3_1
  .4_1
  .5_1
  .6_1
  .7_1
  .8_1
  .9_1

  .0_2
  .1_2
  .2_2
  .3_2
  .4_2
  .5_2
  .6_2
  .7_2
  .8_2
  .9_2

  .0_3
  .1_3
  .2_3
  .3_3
  .4_3
  .5_3
  .6_3
  .7_3
  .8_3
  .9_3

  .0_4
  .1_4
  .2_4
  .3_4
  .4_4
  .5_4
  .6_4
  .7_4
  .8_4
  .9_4

  .0_5
  .1_5
  .2_5
  .3_5
  .4_5
  .5_5
  .6_5
  .7_5
  .8_5
  .9_5

  .0_6
  .1_6
  .2_6
  .3_6
  .4_6
  .5_6
  .6_6
  .7_6
  .8_6
  .9_6
</template>

<script>
export default {
  name: 'Tree',
};
</script>

<style lang="scss" scoped>
.tree {
  background-image: url(../../assets/images/skills_bg.png);
  border-right: 5px dashed rgb(182, 131, 61);
  border-bottom: 5px dashed rgb(182, 131, 61);
  display: grid;
  border-top: 2px solid white;
  border-left: 2px solid white;
  grid-area: tree;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(7, 1fr);
  z-index: 10;

  div {
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
