<template>
  <aside class="min-h-screen flex flex-col bg-blue-600">
    <div class="flex flex-col items-center p-4 border-b">
      <div class="border-2 p-10 relative rounded-full overflow-hidden">
        <img
          class="absolute inset-0 w-full h-full"
          src="../assets/user-solid.svg"
          alt="user-solid"
        />
      </div>
      <h2 class="mt-2 text-white font-m">Admin</h2>
    </div>
    <ul class="sidebar flex-grow">
      <li class="sidebar__menu">
        <router-link :to="{ name: 'Admin.Dashboard' }" class="sidebar__link">
          <span class="sidebar__icon"><i class="fas fa-home"></i></span>
          <span class="sidebar__text">Dashboard</span>
        </router-link>
      </li>
      <li class="sidebar__menu">
        <router-link :to="{ name: 'Admin.Siswa' }" class="sidebar__link">
          <span class="sidebar__icon"><i class="fas fa-users"></i></span>
          <span class="sidebar__text">Siswa</span>
        </router-link>
      </li>
      <li class="sidebar__menu">
        <router-link :to="{ name: 'Admin.KJ' }" class="sidebar__link">
          <span class="sidebar__icon"
            ><i class="fas fa-grip-horizontal"></i
          ></span>
          <span class="sidebar__text">Kelas & Jurusan</span>
        </router-link>
      </li>
      <li class="sidebar__menu">
        <router-link :to="{ name: 'Admin.Absensi' }" class="sidebar__link">
          <span class="sidebar__icon"
            ><i class="fas fa-calendar-check"></i
          ></span>
          <span class="sidebar__text">Absensi</span>
        </router-link>
      </li>
      <li class="sidebar__menu mt-auto">
        <button class="sidebar__link text-left w-full" @click="logOut">
          <span class="sidebar__icon">
            <i class="fas fa-sign-out-alt transform rotate-180"></i>
          </span>
          <span class="sidebar__text">Logout</span>
        </button>
      </li>
    </ul>
  </aside>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const logOut = () => {
      router.push({ name: "Admin.Login" });
    };

    return {
      logOut,
    };
  },
};
</script>

<style></style>
