<template>
  <date-time />
  <div class="mt-14 flex flex-col space-y-5">
    <router-link :to="{ name: 'Admin.Siswa' }">
      <attendance-info>
        <template v-slot:title>Jumlah Siswa</template>
        <template v-slot:value>{{ students }}</template>
      </attendance-info>
    </router-link>
    <router-link :to="{ name: 'Admin.Absensi' }">
      <attendance-info>
        <template v-slot:title>Jumlah Siswa Yang Sudah Absen</template>
        <template v-slot:value>{{ attend }}</template>
      </attendance-info>
    </router-link>
    <router-link :to="{ name: 'Admin.Absensi' }">
      <attendance-info>
        <template v-slot:title>Jumlah Siswa Yang Belum Absen</template>
        <template v-slot:value>{{ notAttend }}</template>
      </attendance-info>
    </router-link>
  </div>
</template>

<script>
import DateTime from "../../components/DateTime.vue";
import AttendanceInfo from "../../components/AttendanceInfo.vue";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import getVariables from "../../composables/getVariables";
export default {
  components: { DateTime, AttendanceInfo },
  setup() {
    const router = useRouter();
    const { urlSiswa, urlAbsensi, retToken } = getVariables();
    const students = ref(0);
    const attend = ref(0);
    const notAttend = ref(0);
    const daily = ref("");

    const getDaily = () => {
      const date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();

      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;

      daily.value = `${y}-${m}-${d}`;
    };

    getDaily();

    const fetchSiswa = async () => {
      const res = await fetch(`${urlSiswa}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        students.value = data.length;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    const fetchAbsensi = async () => {
      const res = await fetch(`${urlAbsensi}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        attend.value = data.filter((atts) => {
          return (
            atts.status.toLocaleString().includes("true") &&
            atts.daily.includes(daily.value)
          );
        }).length;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchSiswa()
      .then(() => fetchAbsensi())
      .then(() => (notAttend.value = students.value - attend.value));

    return {
      students,
      attend,
      notAttend,
    };
  },
};
</script>

<style></style>
