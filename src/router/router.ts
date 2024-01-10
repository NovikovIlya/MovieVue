import { createWebHistory, createRouter } from 'vue-router';
import Vue from 'vue';
import Persons from '../page/Persons.vue';
import PersonPage from '../page/PersonPage.vue';
import FavoriteList from '../page/FavoriteList/FavoritesList.vue';
import SearchComponent from '../page/SearchComponent.vue'
import RandomPerson from '../page/RandomPerson.vue';
import NotFound from '../page/NotFound.vue'
import personNews from '../page/PersonNews.vue'
import InfoCountry from '../page/InfoCountry.vue'
import CountryList from '../page/CountryList.vue'

const routes = [
  {
    path: '/',
    name: 'Persons',
    component: Persons,
  },
  {
    path: '/person/:id',
    name: 'PersonPage',
    component: PersonPage,
  },
  {
    path: '/country/:name',
    name: 'InfoCountry',
    component: InfoCountry,
  },
  {
    path: '/allcountry',
    name: 'CountryList',
    component: CountryList,
  },
  {
    path: '/news/:name',
    name: 'personNews',
    component: personNews
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
  },
  {
    path: "/:catchAll(.*)",
    name: 'notfound',
    component: NotFound,
  }
];

const router = createRouter({
  //@ts-ignore
  routes: routes,
  history: createWebHistory(),
  scrollBehavior (to, from, savedPosition) {
    // возврат желаемого положения
    return { top: 0 ,behavior: 'smooth'}
  }
});

export default router;
