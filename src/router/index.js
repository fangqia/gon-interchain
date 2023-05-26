import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home/index.vue";

Vue.use(VueRouter);
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
   if (onResolve || onReject)
      return originalPush.call(this, location, onResolve, onReject);
   return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
   if (onResolve || onReject)
      return originalReplace.call(this, location, onResolve, onReject);
   return originalReplace.call(this, location).catch(err => err);
};

const routes = [
   {
      path: "/",
      redirect: '/index',
   },
   {
      path: "/index",
      name: "Home",
      component: Home,
   },
   {
      path: "/convert",
      name: "convert",
      component: () => import("@/views/convert"),
   },
   {
      path: "/createNFT",
      name: "createNFT",
      component: () => import("@/views/createNFT"),
   },
];



const router = new VueRouter({
  mode: 'history',
   base: process.env.BASE_URL,
   routes,
   scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
         return savedPosition
      } else {
         return { x: 0, y: 0 }
      }
   }
});

export default router;
