<template>
  <main class="px-16 py-6">
    <date-time />
    <div class="mt-5 flex flex-col space-y-8">
      <attendance-info>
        <template v-slot:title> Jumlah Siswa </template>
        <template v-slot:value> 30 </template>
      </attendance-info>
      <attendance-info>
        <template v-slot:title> Siswa Yang Sudah Absen </template>
        <template v-slot:value> 27 </template>
      </attendance-info>
      <attendance-info>
        <template v-slot:title> Siswa Yang Belum Absen </template>
        <template v-slot:value> 3 </template>
      </attendance-info>
      <logout class="bg-blue-500" />
    </div>
  </main>
</template>

<script>
import { useRouter } from "vue-router";
import AttendanceInfo from "../components/AttendanceInfo.vue";
import DateTime from "../components/DateTime.vue";
import Logout from "../components/Logout.vue";
export default {
  components: { AttendanceInfo, DateTime, Logout },
  setup() {
    const username = sessionStorage.getItem("username");
    const router = useRouter();

    const validation = () => {
      if (!username) return router.push({ name: "Login" });
    };

    window.onload = validation();
  },
};
</script>

<style></style>
