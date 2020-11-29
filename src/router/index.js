import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Character/Home.vue'),
  },
  {
    path: '/items',
    name: 'Items',
    component: () => import(/* webpackChunkName: "items" */ '../views/Items.vue'),
  },
  {
    path: '/runes',
    name: 'Runes',
    component: () => import(/* webpackChunkName: "runes" */ '../views/Runes.vue'),
    children: [
      {
        path: '',
        name: 'Rune',
        component: () => import(/* webpackChunkName: "about" */ '../views/ViewRune.vue'),
        props: (route) => ({ image: route.query.image }),
      },
    ],
  },
  {
    path: '/scrolls',
    name: 'Scrolls',
    component: () => import(/* webpackChunkName: "items" */ '../views/Scrolls.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
