import { createWebHistory,createRouter } from 'vue-router'
import Vue from "vue"
import DirectorAward from '../components/DirectorAward.vue'
import PersonPage from '../components/PersonPage.vue'
import ActorAward from '../components/ActorAward.vue'

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