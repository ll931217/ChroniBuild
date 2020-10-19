import Vue from 'vue';

import Buefy from 'buefy';
// import 'buefy/dist/buefy.css';
import '@/assets/sass/styles.scss';
import TreeView from '@ll931217/vue-treeview';

import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

import changeTitleMixin from './mixins/changeTitle';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(TreeView);

Vue.mixin(changeTitleMixin);

Vue.component('sound', {
  render: (createElement) => createElement(
    'sound', {},
    [
      createElement(
        'audio', {
          attrs: {
            ref: 'hover-sound',
            class: '',
          },
        },
        [
          createElement(
            'source',
            {
              attrs: {
                src: './assets/sounds/menu_select.wav',
              },
            },
          ),
        ],
      ),
    ],
  ),
  methods: {
    hoverSound() {
      const key = 'hover-sound';

      this.$refs[key].load();
      this.$refs[key].volume = 0.5;
      this.$refs[key].play();
    },
    selectSound() {
      const key = 'select-sound';

      this.$refs[key].load();
      this.$refs[key].volume = 0.2;
      this.$refs[key].play();
    },
  },
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
