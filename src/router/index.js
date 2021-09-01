import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    redirect: "/admin/dashboard",
    component: () => import("../views/admin/Admin.vue"),
    children: [
      {
        path: "dashboard",
        name: "Admin.Dashboard",
        component: () => import("../views/admin/Dashboard.vue"),
      },
      {
        path: "siswa",
        name: "Admin.Siswa",
        component: () => import("../views/admin/siswa/Siswa.vue"),
      },
      {
        path: "siswa/edit/:id",
        name: "Admin.Siswa.Edit",
        component: () => import("../views/admin/siswa/Edit.vue"),
        props: true,
      },
      {
        path: "siswa/add",
        name: "Admin.Siswa.Add",
        component: () => import("../views/admin/siswa/Add.vue"),
      },
      {
        path: "kelas-jurusan",
        name: "Admin.KJ",
        component: () => import("../views/admin/KelasJurusan.vue"),
      },
      {
        path: "absensi",
        name: "Admin.Absensi",
        component: () => import("../views/admin/Absensi.vue"),
      },
    ],
  },
  {
    path: "/admin/login",
    name: "Admin.Login",
    component: () => import("../views/admin/Login.vue"),
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   component: () => import("../views/Dashboard.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
