import { createWebHistory, createRouter } from 'vue-router';
import Vue from 'vue';
import DirectorAward from '../page/DirectorAward.vue';
import PersonPage from '../page/PersonPage.vue';
import FavoriteList from '../page/FavoriteList/FavoritesList.vue';
import SearchComponent from '../page/SearchComponent.vue'
import RandomPerson from '../page/RandomPerson.vue';

const routes = [
  {
    path: '/',
    name: 'DirectorAward',
    component: DirectorAward,
  },
  {
    path: '/person/:id',
    name: 'PersonPage',
    component: PersonPage,
  },
  {
    path: '/favorite',
    name: 'FavoriteList',
    component: FavoriteList,
  },
  {
    path: "/search/:text",
    name: 'SearchComponent',
    component: SearchComponent,
  },
  {
    path: "/random",
    name: 'random',
    component: RandomPerson,
  }
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
  scrollBehavior (to, from, savedPosition) {
    // возврат желаемого положения
    return { top: 0 }
  }
});

export default router;
