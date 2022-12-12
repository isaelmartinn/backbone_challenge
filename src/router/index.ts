import { createRouter, createWebHistory } from "vue-router";
import ContactList from "@views/Contacts/ContactsList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ContactList,
    },
    {
      path: "/contacts/:id",
      name: "contactView",
      component: () => import("@views/Contacts/ContactView.vue"),
    },
    {
      path: "/contacts/:id/delete",
      name: "contactDelete",
      component: () => import("@views/Contacts/ContactDelete.vue"),
    },
    {
      path: "/contacts/create",
      name: "contactCreate",
      component: () => import("@views/Contacts/ContactCreate.vue"),
    },
  ],
});

export default router;
