<template>
  <Header :student="student" />
  <main class="px-16 py-6">
    <Absence />
  </main>
</template>

<script>
import Header from "../components/Header.vue";
import Absence from "../components/Absence.vue";
export default {
  components: { Header, Absence },
  setup() {
    const student = {
      nisn: 8888526148,
      full_name: "Joe Adams",
      gender: "Laki - Laki",
      grade: "XII",
      major: "SIJA",
      address: "Tebet, Jakarta Selatan",
    };

    return {
      student,
    };
  },
};
</script>

<style></style>
