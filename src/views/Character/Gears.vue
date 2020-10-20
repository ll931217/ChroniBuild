<template lang="pug">
- var itemTypes = ['helm', 'accessory', 'amulet', 'offhand', 'chest', 'weapon', 'boot', 'ring']
.gears
  .items
    each type in itemTypes
      div(class=type)
        .item.skills
        .options
          .enchant.skills
          .reroll.skills
        .gems
          .slot
          .slot
          .slot
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
    transform: scale(1.4);

    &> div {
      display: grid;
      grid-template-columns: 24px 48px;
      grid-template-rows: repeat(2, 24px);
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
          display: flex;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
        }

        .reroll {
          background-position: -3415px -1597px;
          height: 19px;
          width: 19px;
        }
      }

      &> .item, &> .options {
        border: 1px solid white;
      }

      &> .gems {
        grid-area: gems;
        border: 1px solid white;
        display: inline-flex;

        .slot {
          border: 1px solid white;
          flex-grow: 1;
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
