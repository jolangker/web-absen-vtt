<template>
  <div class="flex" v-if="session">
    <Sidebar />
    <main class="px-10 py-6 flex-grow">
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Sidebar from "../../components/Sidebar.vue";
import getVariables from "../../composables/getVariables";
export default {
  components: { Sidebar },
  setup() {
    const router = useRouter();
    const username = sessionStorage.getItem("username");
    const { retToken } = getVariables();
    const session = ref(false);

    const validation = async () => {
      if (!username || !retToken) return router.push({ name: "Admin.Login" });
      session.value = true;
    };

    const logOut = () => {
      router.push({ name: "Admin.Login" });
    };

    window.onload = validation();

    return {
      logOut,
      session,
    };
  },
};
</script>

<style></style>
