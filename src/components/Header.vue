<template>
  <header class="px-16 py-4 text-white bg-blue-600">
    <h1 class="text-2xl font-medium uppercase">
      Halo, {{ student.full_name }}
    </h1>
    <p class="mt-1 opacity-70 text-sm tracking-widest">
      NISN : {{ student.nisn }}
    </p>
  </header>
</template>

<script>
export default {
  props: {
    student: Object,
  },
  setup() {},
};
</script>

<style></style>
