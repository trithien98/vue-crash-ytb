import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import("@/views/HomeView.vue")
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: () => import("@/views/JobsView.vue")
        },
        {
            path: '/jobs/:id',
            name: 'job-details',
            component: () => import("@/views/JobView.vue")
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: () => import("@/views/NotFound.vue")
        }
    ]
})
export default router;