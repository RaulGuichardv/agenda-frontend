import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Registro from '../views/Registro.vue';
import Agenda from '../views/Agenda.vue';
import CrearContacto from '../views/CrearContacto.vue';
import EditarContacto from '../views/EditarContacto.vue';
import Perfil from '../views/Perfil.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/registro', component: Registro },
  { path: '/agenda', component: Agenda, meta: { requiresAuth: true } },
  { path: '/agenda/crear', component: CrearContacto, meta: { requiresAuth: true } },
  { path: '/agenda/:id', component: EditarContacto, meta: { requiresAuth: true } },
  { path: '/perfil', component: Perfil, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  auth.tryLoadFromStorage();
  if (to.meta.requiresAuth && !auth.token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
