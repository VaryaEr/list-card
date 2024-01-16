import { createRouter, createWebHashHistory } from "vue-router";
import index from "../views/index.vue";
import createCard from "../views/createCard.vue";

const routes = [
    { path: "/", name: "index", component: index, props: true, },
    { path: "/create-card", name: "create-card", component: createCard, props: true, },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

export default router;
