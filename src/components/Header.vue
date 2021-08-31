<template>
  <header
    class="
      px-4
      lg:px-16
      py-4
      text-white
      bg-blue-600
      flex
      justify-between
      items-center
    "
  >
    <div class="flex-grow">
      <h1 class="lg:text-2xl font-medium uppercase">
        Halo, <br class="lg:hidden" />{{ student.name }}
      </h1>
    </div>
    <Logout @click="logOut" class="w-36" />
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
