import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {   path:"/",
            name: "Auth",
            component: () => import("../views/AuthView.vue")
        },
    ]
})

export default router;