import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Register from '../views/RegisterView.vue';
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/register', name: 'Register', component: Register },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
