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
            path:"/list",
            name:"List",
            component: () => import("../views/ListView.vue")
        }
    ]
})

export default router;