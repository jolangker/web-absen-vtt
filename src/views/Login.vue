<template>
  <div class="h-screen bg-blue-400 flex justify-center items-center">
    <login-siswa />
  </div>
</template>

<script>
import LoginSiswa from "../components/LoginSiswa.vue";

export default {
  components: { LoginSiswa },
  setup() {
    window.onload = sessionStorage.clear();
  },
};
</script>

<style></style>
