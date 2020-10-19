<template lang="pug">
- var itemTypes = ['helm', 'accessory', 'amulet', 'offhand', 'chest', 'weapon', 'boot', 'ring']
.gears
  .items
    each type in itemTypes
      div(class=type)
        .item.skills
        .options
        .gems
</template>

<script>
export default {
  name: 'Gears',
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
  background-image: url(../../assets/images/skills_bg.png);
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
    transform: scale(2);

    &> div {
      display: grid;
      grid-template-columns: repeat(2, 26px);
      grid-template-rows: repeat(2, 52px);
      grid-template-areas:
        'item options'
        'gems gems';
      border: 2px inset white;
      height: 26px;
      width: 26px;

      &> .item {
        grid-area: item;
      }

      &> .options {
        grid-area: options;
      }

      &> .item, &> .options {
        height: 26px;
        width: 26px;
      }

      &> .gems {
        grid-area: gems;
        height: 26px;
        width: 52px;
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
