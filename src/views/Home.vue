<template lang="pug">
#home
  h1.title.is-1.has-text-white.mb-0.ml-3 Build
  .container
    .columns.is-gapless.is-mobile
      .column
        .character
          Stats
          Gears
          .header
            .details
              .char-stats
                span.level Lv. 100
                span.mastery-points , M 2000
              span.skill-points Skill Points: 100
            p.class Berserker
            .tree-list
              .tree-tab.skills.disabled#guardian
              .tree-tab.skills.disabled#sky_lord
              .tree-tab.skills#dragonkin
              .tree-tab.skills.disabled#frostborn
              .tree-tab.skills.disabled#masteries
          Tree

    .columns.is-centered.is-half
      .column
        h1.title.is-1.has-text-white.mb-0.ml-3 Guide
        #editorjs
</template>

<script>
import EditorJS from '@editorjs/editorjs';

import Gears from './Character/Gears.vue';
import Tree from './Character/Tree.vue';
import Stats from './Character/Stats.vue';
// @ is an alias to /src

export default {
  name: 'Home',
  created() {
    const editor = new EditorJS({
      holder: 'editorjs',
    });

    editor.isReady
      .then(() => {
        console.log('Editor.js is ready to work!');
      })
      .catch((err) => {
        console.log(`Editor.js initialisation failed because of ${err}`);
      });
  },
  components: {
    Gears,
    Tree,
    Stats,
  },
};
</script>

<style lang="scss">
#editorjs {
  background-color: white;
}

.skills {
  background-image: url(../assets/images/skills.png);
}

.character {
  display: grid;
  height: 400px;
  grid-template-columns: 3fr 2fr 4fr;
  grid-template-rows: 85px auto;
  grid-template-areas:
    "stats header header"
    "stats gears tree";

  .disabled {
    filter: brightness(.4);
  }

  .circle {
    height: 22px;
    width: 22px;
    border-radius: 50%;
  }

  .square {
    height: 26px;
    width: 26px;
  }

  .header {
    grid-area: header;

    background-image: url(../assets/images/skills_bg.png);
    border-right: 5px dashed rgb(182, 131, 61);
    border-left: 5px dashed rgb(182, 131, 61);
    border-top: 5px dashed rgb(182, 131, 61);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 4fr 1fr 1fr 4fr;
    grid-template-areas:
      "details . ."
      "details . ."
      ". . ."
      "class tree-list .";

    .details {
      grid-area: details;

      display: flex;
      flex-direction: column;
      padding: 0 1.5em;

      .char-stats {
        display: inline-flex;

        .level {
          margin: 0;
        }
      }
    }

    p.class {
      grid-area: class;
      margin: 0;
      padding: 0 1em;
    }

    .tree-list {
      grid-area: tree-list;
      display: flex;
      justify-content: space-around;
      margin-bottom: -5px;
      padding: 0 1em;
      width: 200px;
      transform: scale(1.2);

      .tree-tab {
        border: 2px solid white;
        cursor: pointer;
        height: 26px;
        width: 26px;
        box-shadow: 2px 2px 5px black;

        &.selected {
          z-index: 11;
        }

        &#masteries {
          background-position: -2596px -1146px;
        }

        // BERSERKER
        &#guardian {
          background-position: -2941px -1147px;
        }

        &#sky_lord {
          background-position: -2180px -1147px;
        }

        &#dragonkin {
          // background-position: -2431px -1259px;
          background-position: -3188px -1146px;
        }

        &#frostborn {
          background-position: -3578px -1144px;
        }
      }
    }
  }
}
</style>
