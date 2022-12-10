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
  ],
});

export default router;
