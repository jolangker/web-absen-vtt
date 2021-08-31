<template>
  <div class="flex">
    <Sidebar />
    <main class="px-16 py-6 flex-grow">
      <date-time />
    </main>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import AttendanceInfo from "../components/AttendanceInfo.vue";
import Sidebar from "../components/Sidebar.vue";
import DateTime from "../components/DateTime.vue";
import Logout from "../components/Logout.vue";
import getVariables from "../composables/getVariables";
export default {
  components: { AttendanceInfo, DateTime, Logout, Sidebar },
  setup() {
    const router = useRouter();
    const username = sessionStorage.getItem("username");
    const { urlSiswa, urlAbsensi, cors, retToken } = getVariables();
    const jumlahSiswa = ref(0);
    const jumlahAbsen = ref(0);
    const jumlahTidakAbsen = ref(0);

    const fetchSiswa = async () => {
      const res = await fetch(`${cors}${urlSiswa}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        jumlahSiswa.value = data.length;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin" });
      }
    };

    const fetchAbsensi = async () => {
      const res = await fetch(`${cors}${urlAbsensi}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        const filtered = data.filter((absence) => {
          return absence.status.toLocaleString().includes("true");
        });
        jumlahAbsen.value = filtered.length;
      } catch (err) {
        alert(err);
        router.push({ name: "Login" });
      }
    };

    const validation = async () => {
      if (!username || !retToken) return router.push({ name: "Login" });
      await fetchSiswa();
      await fetchAbsensi();
      jumlahTidakAbsen.value = jumlahSiswa.value - jumlahAbsen.value;
    };

    const logOut = () => {
      router.push({ name: "Admin" });
    };

    // window.onload = validation();

    return {
      jumlahSiswa,
      jumlahAbsen,
      jumlahTidakAbsen,
      logOut,
    };
  },
};
</script>

<style></style>
