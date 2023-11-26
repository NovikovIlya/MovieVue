import { createWebHistory,createRouter } from 'vue-router'
import Vue from "vue"
import DirectorAward from '../components/DirectorAward.vue'


const routes = [
    {
        path: '/',
        component: DirectorAward
    },
   

]

const router = createRouter({
    routes,
    history:createWebHistory()
})



export default router;