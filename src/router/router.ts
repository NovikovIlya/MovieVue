import { createWebHistory, createRouter } from 'vue-router';
import Vue from 'vue';
import DirectorAward from '../page/DirectorAward.vue';
import PersonPage from '../page/PersonPage.vue';
import FavoriteList from '../page/FavoritesList.vue';
import SearchComponent from '../page/SearchComponent.vue'

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
  }
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

export default router;
