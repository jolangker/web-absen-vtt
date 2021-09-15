<template>
  <date-time />
  <div class="mt-14 flex flex-col space-y-5">
    <router-link :to="{ name: 'Admin.Siswa' }">
      <attendance-info>
        <template v-slot:title>Jumlah Siswa</template>
        <template v-slot:value>{{ students.length }}</template>
      </attendance-info>
    </router-link>
    <router-link :to="{ name: 'Admin.Absensi' }">
      <attendance-info>
        <template v-slot:title>Jumlah Siswa Yang Sudah Absen</template>
        <template v-slot:value>{{ attend.length }}</template>
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
import { onMounted } from "@vue/runtime-core";
import Pusher from "pusher-js";
export default {
  components: { DateTime, AttendanceInfo },
  setup() {
    const router = useRouter();
    const { urlSiswa, urlDaily, cors, retToken } = getVariables();
    const students = ref([]);
    const attend = ref([]);
    const notAttend = ref(0);
    const daily = ref("");

    onMounted(() => {
      const pusher = new Pusher("9c4a66de751481d7442a", {
        cluster: "ap1",
      });

      const channel = pusher.subscribe("absenvttv3");
      channel.bind("absen", (data) => {
        attend.value.push(data);
        notAttend.value = students.value.length - attend.value.length;
      });
    });

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
      const res = await fetch(`${cors}${urlSiswa}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        students.value = data;
        students.value.splice(0, 1);
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    const fetchAbsensi = async () => {
      const res = await fetch(`${cors}${urlDaily}${daily.value}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        attend.value = data;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchSiswa()
      .then(() => fetchAbsensi())
      .then(
        () => (notAttend.value = students.value.length - attend.value.length)
      );

    return {
      students,
      attend,
      notAttend,
    };
  },
};
</script>

<style></style>
