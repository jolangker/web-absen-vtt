<template>
  <button
    class="
      py-2
      px-6
      text-lg text-white
      font-medium
      duration-300
      rounded
      hover:bg-blue-800
    "
    @click="logOut"
  >
    <span class="mr-3">Logout</span>
    <i class="fas fa-sign-out-alt"></i>
  </button>
</template>

<script>
import { useRouter } from "vue-router";
export default {
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
