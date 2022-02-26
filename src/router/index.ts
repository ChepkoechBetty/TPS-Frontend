import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import Account from "@/views/Account.vue";
import Withdraw from "@/views/Withdraw.vue";
import Transfer from "@/views/Transfer.vue";
import { useStore } from "vuex";

const routes = [
  { path: "/", component: LoginView },
  { path: "/account", component: Account },
  { path: "/withdraw", component: Withdraw },
  { path: "/transfer", component: Transfer },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
