<template lang="pug">
#character-home
  h1.title.is-1.has-text-danger.mb-0.ml-3 ADD STEPS
  router-view
</template>

<script>
export default {
  name: 'CharacterHome',
};
</script>

<style lang="scss">
.tabs {
  a {
    color: white;
  }
}

.skills {
  background-image: url(../../assets/images/skills.png);
}
</style>
