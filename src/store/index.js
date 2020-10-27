import Vue from 'vue';
import Vuex from 'vuex';

import BaseStats from '@/assets/data/base_stats.json';
import SkillData from '@/assets/data/skilldata.json';
import RunesTree from '@/assets/data/runes_tree.json';

import {
  MUTATE_INIT_BASE_STATS,
  MUTATE_BASE_STATS,
  MUTATE_SETTINGS,
  MUTATE_POINTS,
} from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: SkillData.version,
    trees: SkillData.tree,
    base: BaseStats,
    stats: {},
    points: {
      skill: 100,
      mastery: 2000,
    },
    difficulties: [
      {
        name: 'Casual',
        stats: {},
      },
      {
        name: 'Normal',
        stats: {},
      },
      {
        name: 'Heroic',
        stats: {
          resistances: -10,
          magicFind: 25,
          bonusCrystals: 20,
          bonusExp: 15,
        },
      },
      {
        name: 'Epic',
        stats: {
          resistances: -15,
          magicFind: 60,
          bonusCrystals: 60,
          bonusExp: 40,
        },
      },
      {
        name: 'Legendary',
        stats: {
          resistances: -25,
          magicFind: 100,
          bonusCrystals: 150,
          bonusExp: 100,
        },
      },
    ],
    masteries: [],
    items: [],
    runes: RunesTree,
    classes: [
      {
        name: 'Templar',
        bars: {
          offense: 80,
          defense: 100,
          ranged: 50,
          avoidance: 20,
          mobility: 40,
        },
        elements: ['Physical', 'Holy', 'Fire', 'Lightning'],
        perks: [
          'Can block attacks with her shield',
          'Many healing and defensive abilities',
          '+30% damage reduction',
        ],
        description: [
          'The Templar is a noble & strong warrior, who is capable of wielding the power of the Light, Fire and Lightning to cause both healing and destruction. Her abilities mainly focus on close quarters combat, damage absorption, and healing.',
          'However the Templar also possess a few ranged abilities to draw the attention of her foes, or to finish off those who would flee her might.',
          'The Templar won\'t go down easy',
        ],
      },
      {
        name: 'Berserker',
        bars: {
          offense: 90,
          defense: 60,
          ranged: 30,
          avoidance: 50,
          mobility: 80,
        },
        elements: ['Physical', 'Fire', 'Frost', 'Lightning'],
        perks: [
          'Uses rage to fuel some abilities',
          'Double base health and mana regeneration',
          '+30% damage reduction',
        ],
        description: [
          'The Berserker is a fierce fighter, able to wield the powers of the Dragons: Fire, Lightning and Frost. Her focuses on quickly getting close to his enemies to destroy them with the ancient Dragon powers and brute strength. While a strongly offensive class, the Berserker has a lot of defensive options. With high damage output and mobility, the Berserker is a dangerous killing machine.',
        ],
      },
      {
        name: 'Warden',
        bars: {
          offense: 90,
          defense: 30,
          ranged: 100,
          avoidance: 40,
          mobility: 60,
        },
        elements: ['Physical', 'Poison', 'Frost', 'Lightning'],
        perks: [
          'Can summon creatures of nature',
          '+5% Evasion',
          '+10% to all Resistances',
        ],
        description: [
          'The Warden is a powerful and versatile fighter, who is not only an expert marksman but also wield the power of Nature itself, using spells of Lightning, Frost, and poison. She may also call upon various creatures of the wild to aid her in the destruction of her foes. While she has low defenses, her natural speed and avoidance abilities make her suited for hit & run tactics, or she may rely on her companions to attract the attention of her foes.',
        ],
      },
      {
        name: 'Warlock',
        bars: {
          offense: 100,
          defense: 60,
          ranged: 80,
          avoidance: 40,
          mobility: 40,
        },
        elements: ['Shadow', 'Fire', 'Frost', 'Poison'],
        perks: [
          'Collect souls to fuel abilities',
          'Can summon demons and undeads',
          '+10% to all Resistances',
        ],
        description: [
          'The Warlock is a powerful magician, able to wield the power of Shadow, Frost, Poison, and Fire to cause great destruction and suffering. He may also summon demons, undead, and other unholy beings to do his bidding.',
          'Wearing nothing but cloth robes, the Warlock has the option to keep enemies at range with his minions and utility skills, or he may chose to magically bolster his defenses and get up close and personal.',
        ],
      },
    ],
    settings: {
      characterClass: 'Berserker',
      difficulty: '',
    },
  },
  getters: {
    version: (state) => state.version,
    trees: (state) => state.trees,
    base: (state) => state.base,
    stats: (state) => state.stats,
    masteries: (state) => state.masteries,
    items: (state) => state.items,
    runes: (state) => state.runes,
    points: (state) => state.points,
    classes: (state) => state.classes,
    difficulties: (state) => state.difficulties,
    settings: (state) => state.settings,
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
    [MUTATE_INIT_BASE_STATS]: (state, { characterClass }) => {
      state.stats = state.base[characterClass];
    },
    [MUTATE_BASE_STATS]: (state, { statKey, statValue }) => {
      if (statKey.indexOf('.') === -1) {
        state.stats[statKey] += statValue;
      } else {
        const keys = statKey.split('.');
        state.stats[keys[0]][keys[1]] += statValue;
      }
    },
    [MUTATE_SETTINGS]: (state, { settingKey, settingValue }) => {
      state.settings[settingKey] = settingValue;
    },
    [MUTATE_POINTS]: (state, { pointKey, pointValue }) => {
      state.settings[pointKey] = pointValue;
    },
  },
  actions: {
    pickClass: ({ state, commit, dispatch }, characterClass) => {
      commit(MUTATE_INIT_BASE_STATS, { characterClass });
      commit(MUTATE_SETTINGS, { settingKey: 'characterClass', settingValue: characterClass });
      if (state.settings.difficulty !== '') {
        dispatch('pickDifficulty', state.settings.difficulty);
      }
    },
    restoreDifficulty: ({ state, commit }, difficulty) => {
      commit(MUTATE_SETTINGS, { settingKey: 'difficulty', settingValue: difficulty });
      const diff = state.difficulties.find((d) => d.name === difficulty);
      if (diff) {
        Object.entries(diff.stats).forEach(([key, value]) => {
          if (key === 'resistances') {
            [
              'resistance.fire',
              'resistance.frost',
              'resistance.holy',
              'resistance.lightning',
              'resistance.physical',
              'resistance.poison',
              'resistance.shadow',
            ].forEach((res) => commit(MUTATE_BASE_STATS, {
              statKey: res,
              statValue: Math.abs(value),
            }));
          } else {
            commit(MUTATE_BASE_STATS, { statKey: key, statValue: value });
          }
        });
      }
    },
    pickDifficulty: ({ state, commit }, difficulty) => {
      commit(MUTATE_SETTINGS, { settingKey: 'difficulty', settingValue: difficulty });
      const diff = state.difficulties.find((d) => d.name === difficulty);
      if (diff) {
        Object.entries(diff.stats).forEach(([key, value]) => {
          if (key === 'resistances') {
            [
              'resistance.fire',
              'resistance.frost',
              'resistance.holy',
              'resistance.lightning',
              'resistance.physical',
              'resistance.poison',
              'resistance.shadow',
            ].forEach((res) => commit(MUTATE_BASE_STATS, { statKey: res, statValue: value }));
          } else {
            commit(MUTATE_BASE_STATS, { statKey: key, statValue: value });
          }
        });
      }
    },
  },
  modules: {
  },
});
