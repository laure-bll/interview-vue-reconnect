import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Login from "@/views/LoginView.vue";
import { getConnectedUser } from "@/api/auth";
import NotFound from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "dashboard",
      component: Home,
    },
    {
      path: "/:catchAll(.*)",
      name: "notfound",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const canAccess = getConnectedUser()?.username;
  if (to.name !== "login" && !canAccess) next({ name: "login" });
  else if (to.name === "login" && !!canAccess) next({ name: "dashboard" });
  else next();
});

export default router;
