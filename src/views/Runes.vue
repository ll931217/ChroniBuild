<template lang="pug">
#runes
  h1.title.is-1.has-text-white Runes
  .container
    .columns
      .column.is-one-third
        tree-view(
          :tree.sync="runes",
          :editable="false",
          :expanded="false",
          :draggable="false",
          :show-parent-icon="{ parentShow: true, emptyParentShow: false }"
        ).pl-0.mb-4
      .column(style="display: flex;justify-content: center;")
        router-view
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Runes',
  computed: {
    ...mapGetters({
      runes: 'runes',
    }),
  },
};
</script>

<style lang="sass" scoped>
// #ll931217-vue-treeview
//   background: none
//   box-shadow: none
</style>
