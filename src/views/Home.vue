<template>
  <Header />
  <main class="px-16 py-6">
    <Absence />
  </main>
</template>

<script>
import Header from "../components/Header.vue";
import Absence from "../components/Absence.vue";
export default {
  components: { Header, Absence },
};
</script>

<style></style>
