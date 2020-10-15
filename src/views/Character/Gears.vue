<template lang="pug">
.gears
  .items
    .helm.skills
    .accessory.skills
    .amulet.skills
    .offhand.skills
    .chest.skills
    .weapon.skills
    .boot.skills
    .ring.skills
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
    transform: scale(2.5);

    div {
      border: 2px inset white;
      height: 26px;
      width: 26px;
    }

    .helm {
      background-position: -3120px -1042px;
    }
    .accessory {
      background-position: -2097px -1045px;
    }
    .amulet {
      background-position: -3216px -1042px;
    }

    .offhand {
      background-position: -2356px -1041px;
    }

    .chest {
      background-position: -3644px -1042px;
    }

    .weapon {
      background-position: -2234px -1045px;
    }

    .boot {
      background-position: -3522px -1041px;
    }

    .ring {
      background-position: -3548px -1041px;
    }
  }
}
</style>
