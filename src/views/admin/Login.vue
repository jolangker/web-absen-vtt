<template>
  <div class="h-screen bg-blue-400 flex justify-center items-center px-8">
    <login-admin />
  </div>
</template>

<script>
import LoginAdmin from "../../components/LoginAdmin.vue";

export default {
  components: { LoginAdmin },
  setup() {
    window.onload = sessionStorage.clear();
  },
};
</script>

<style></style>
