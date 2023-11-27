import { createWebHistory,createRouter } from 'vue-router'
import Vue from "vue"
import DirectorAward from '../components/DirectorAward.vue'
import PersonPage from '../components/PersonPage.vue'

const routes = [
    {
        path: '/',
        component: DirectorAward
    },
    {
        path: '/person/:id',
        component: PersonPage
    },
   

]

const router = createRouter({
    routes,
    history:createWebHistory()
})



export default router;