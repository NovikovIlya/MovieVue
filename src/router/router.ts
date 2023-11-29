import { createWebHistory,createRouter } from 'vue-router'
import Vue from "vue"
import DirectorAward from '../page/DirectorAward.vue'
import PersonPage from '../page/PersonPage.vue'
import ActorAward from '../page/StudioList.vue'

const routes = [
    {
        path: '/',
        component: DirectorAward
    },
    {
        path: '/person/:id',
        component: PersonPage
    },
    {
        path: '/actor',
        component: ActorAward
    },
   

]

const router = createRouter({
    routes,
    history:createWebHistory()
})



export default router;