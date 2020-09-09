import Vue from 'vue';

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

import changeTitleMixin from './mixins/changeTitle';

Vue.config.productionTip = false;

Vue.use(Buefy);

Vue.mixin(changeTitleMixin);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
