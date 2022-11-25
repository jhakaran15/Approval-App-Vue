import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import approveList from "../components/approveList.vue";
import approval from "../components/approval.vue";
import OtpInput from "../components/OtpInput.vue";
import approvalLevels from "../components/approvalLevels.vue";
import approve from "../components/approve.vue";
import StatusLog from "../components/StatusLog.vue";
import responseSubmitted from "../components/responseSubmitted.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/responseSubmitted",
    name: "responseSubmitted",
    component: responseSubmitted,
  },

  {
    path: "/Home",
    name: "Home",
    component: Home,
    redirect: { name: "approveList" },
    children: [
      {
        path: "/approveList",
        name: "approveList",
        component: approveList,
      },
      {
        path: "/approval",
        name: "approval",
        component: approval,
      },
      {
        path: "/approvalLevels",
        name: "approvalLevels",
        component: approvalLevels,
      },
      {
        path: "/StatusLog",
        name: "StatusLog",
        component: StatusLog,
      },
    ],
  },
  {
    path: "/OtpInput/:id(.*)",
    name: "OtpInput",
    component: OtpInput,
  },
  {
    path: "/approve",
    name: "approve",
    component: approve,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  // base: "/ApprovalVueApp/",
  routes,
});

export default router;
