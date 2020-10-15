import Vue from 'vue';
import Vuex from 'vuex';

import BaseStats from '@/assets/data/base_stats.json';
import SkillData from '@/assets/data/skilldata.json';
import RunesTree from '@/assets/data/runes_tree.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: SkillData.version,
    trees: SkillData.tree,
    base: BaseStats,
    stats: {
      health: 0,
      mana: 0,
      damage: 0,
      attackSpeed: 0,
      critChance: 0,
      critDamage: 0,
      overpower: 0,
      damageElements: {
        physical: 0,
        poison: 0,
        lightning: 0,
        frost: 0,
        archery: 0,
        nature: 0,
        storm: 0,
        bleed: 0,
        fire: 0,
        holy: 0,
        shadow: 0,
      },
      thorns: 0,
      healthRegen: 0,
      manaRegen: 0,
      healthOnHit: 0,
      manaOnHit: 0,
      evasion: 0,
      damageReduction: 0,
      resistance: {
        physical: 0,
        fire: 0,
        frost: 0,
        lightning: 0,
        poison: 0,
        holy: 0,
        shadow: 0,
      },
      cooldownReduction: 0,
      manaCostReduction: 0,
      effectDuration: 0,
      bonusCrystals: 0,
      magicFind: 0,
      bonusExp: 0,
      potionEffectiveness: 0,
      reach: 0,
      movementSpeed: 0,
      damageStaggered: 0,
      indirect: {
        bleeding: 0,
        burn: 0,
        instantFrost: 0,
        poison: 0,
        chainLightning: 0,
        smite: 0,
        blight: 0,
      },
      healingTaken: 0,
      willpower: 0,
      manaShield: 0,
      gemStrength: 0,
      satelliteDamage: 0,
      lightRadius: 0,
      pickupStrength: 0,
      pickupRadius: 0,
      companion: {
        damageReduction: 0,
        passiveUseEffect: 0,
        health: 0,
        damage: 0,
      },
    },
    points: {
      skill: 100,
      mastery: 2000,
    },
    masteries: [],
    items: [],
    runes: RunesTree,
    classes: ['Warden', 'Warlock', 'Templar', 'Berserker'],
    characterClass: '',
  },
  getters: {
    version: (state) => state.version,
    tree: (state) => state.tree,
    base: (state) => state.base,
    stats: (state) => state.stats,
    masteries: (state) => state.masteries,
    items: (state) => state.items,
    runes: (state) => state.runes,
    points: (state) => state.points,
    classes: (state) => state.classes,
    characterClass: (state) => state.characterClass,
    export: ({
      version,
      characterClass,
      points,
      items,
      masteries,
      stats,
    }) => window.btoa(JSON.stringify({
      version,
      characterClass,
      points,
      items,
      masteries,
      stats,
    }, null, 0)),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
