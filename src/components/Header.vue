<template>
  <header
    class="px-16 py-4 text-white bg-blue-600 flex justify-between items-center"
  >
    <div>
      <h1 class="text-2xl font-medium uppercase">Halo, {{ student.name }}</h1>
      <p class="mt-1 opacity-70 text-sm tracking-widest">
        NISN : {{ student.nisn }}
      </p>
    </div>
    <Logout @click="logOut" />
  </header>
</template>

<script>
import { useRouter } from "vue-router";
import Logout from "./Logout.vue";
export default {
  components: { Logout },
  props: {
    student: Object,
  },
  setup() {
    const router = useRouter();
    const logOut = () => {
      router.push({ name: "Login" });
    };

    return {
      logOut,
    };
  },
};
</script>

<style></style>
