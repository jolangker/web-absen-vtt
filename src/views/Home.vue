<template>
  <div v-if="Object.keys(student).length">
    <Header :student="student" />
    <main class="px-4 lg:px-16 py-6">
      <Attendance :name="student.name" />
    </main>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Attendance from "../components/Attendance.vue";
import Loading from "../components/Loading.vue";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import getVariables from "../composables/getVariables";
export default {
  components: { Header, Attendance, Loading },
  setup() {
    const nisn = sessionStorage.getItem("nisn");
    const router = useRouter();
    const { urlSiswa, cors, retToken } = getVariables();
    const student = ref({});

    const fetchData = async () => {
      const res = await fetch(`${cors}${urlSiswa}${nisn}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        student.value = data;
      } catch (err) {
        alert(err);
        router.push({ name: "Login" });
      }
    };

    const validation = () => {
      if (!nisn || !retToken) return router.push({ name: "Login" });
      fetchData();
    };

    window.onload = validation();

    return {
      student,
    };
  },
};
</script>

<style></style>
