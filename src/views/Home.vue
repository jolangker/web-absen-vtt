<template>
  <div v-if="Object.keys(student).length">
    <Header :student="student" />
    <main class="px-16 py-6">
      <Absence />
    </main>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Absence from "../components/Absence.vue";
import Loading from "../components/Loading.vue";
import { useRouter } from "vue-router";
import { reactive, ref } from "@vue/reactivity";
export default {
  components: { Header, Absence, Loading },
  setup() {
    const nisn = sessionStorage.getItem("nisn");
    const router = useRouter();
    const url = `https://absenvtt.herokuapp.com/api/Siswa/${nisn}?format=json`;
    const cors = "https://cors-anywhere.herokuapp.com/";
    const student = ref({});

    const fetchData = async () => {
      const res = await fetch(`${cors}${url}`);
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        student.value = data;
      } catch (err) {
        alert(err);
        // router.push({ name: "Login" });
      }
    };

    const validation = () => {
      if (!nisn) return router.push({ name: "Login" });
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
