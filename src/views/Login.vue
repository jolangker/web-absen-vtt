<template>
  <div class="h-screen bg-blue-400 flex justify-center items-center">
    <login-siswa v-if="!admin">
      <p
        role="button"
        @click="changeLevel"
        class="mt-5 text-center text-sm font-medium italic"
      >
        Masuk Sebagai Admin
      </p>
    </login-siswa>
    <login-admin v-else>
      <p
        role="button"
        @click="changeLevel"
        class="mt-5 text-center text-sm font-medium italic"
      >
        Masuk Sebagai Siswa
      </p>
    </login-admin>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import LoginSiswa from "../components/LoginSiswa.vue";
import LoginAdmin from "../components/LoginAdmin.vue";
export default {
  components: { LoginSiswa, LoginAdmin },
  setup() {
    const admin = ref(false);

    const changeLevel = () => {
      admin.value = !admin.value;
    };

    window.onload = sessionStorage.clear();

    return {
      admin,
      changeLevel,
    };
  },
};
</script>

<style></style>
