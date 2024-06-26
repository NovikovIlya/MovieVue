import { createWebHistory, createRouter } from 'vue-router';
import Persons from '../pages/Persons.vue';
import PersonPage from '../pages/PersonPage.vue';
import FavoriteList from '../pages/FavoritesList.vue';
import SearchComponent from '../pages/SearchComponent.vue'
import RandomPerson from '../pages/RandomPerson.vue';
import NotFound from '../pages/NotFound.vue'
import personNews from '../pages/PersonNews.vue'
import InfoCountry from '../pages/InfoCountry.vue'
import CountryList from '../pages/CountryList.vue'

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
  routes: routes,
  history: createWebHistory(),
  scrollBehavior () {
    // возврат желаемого положения
    return { top: 0, behavior: 'smooth'}
  }
});

export default router;
