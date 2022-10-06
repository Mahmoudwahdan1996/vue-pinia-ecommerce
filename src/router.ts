import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./store/authStore";

import Home from "./pages/Home.vue";
import Cart from "./pages/cart.vue";
import Auth from "./pages/auth.vue";
import ProductPage from "./pages/ProductPage.vue";
import NotFound from "./pages/notFound.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/products",
    },
    {
      path: "/products",
      component: Home,
    },

    {
      path: "/cart",
      component: Cart,
    },
    {
      path: "/products/:id",
      component: ProductPage,
      props: true,
    },
    {
      path: "/auth",
      component: Auth,
      meta: { requiresUnAuth: true },
    },
    { path: "/:notfound(.*)", component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresUnAuth && authStore.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
