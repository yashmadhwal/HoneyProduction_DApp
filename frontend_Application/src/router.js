import { createWebHistory, createRouter } from "vue-router";

import Home from './components/Home.vue';
import HoneyInfo from './pages/HoneyInfo.vue';

const routes=[
    {
        name:'Home',
        path:'/',
        component: Home
    },
    {
        name:'HoneyInfo',
        path:'/:id',
        component: HoneyInfo,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;

