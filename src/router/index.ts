import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {   
            path:"/",
            name: "Auth",
            component: () => import("../views/AuthView.vue")
        },
        {
            path:"/settings",
            name: "Settings",
            component: () => import("../views/SettingsView.vue")
        },
        {
            path:"/projects-list",
            name:"List",
            component: () => import("../views/ProjectsListView.vue")
        }
    ]
})

export default router;