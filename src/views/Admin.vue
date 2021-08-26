<template>
  <main class="px-16 py-6">
    <date-time />
    <div class="mt-5 flex flex-col space-y-8">
      <attendance-info>
        <template v-slot:title> Jumlah Siswa </template>
        <template v-slot:value> 30 </template>
      </attendance-info>
      <attendance-info>
        <template v-slot:title> Siswa Yang Sudah Absen </template>
        <template v-slot:value> 27 </template>
      </attendance-info>
      <attendance-info>
        <template v-slot:title> Siswa Yang Belum Absen </template>
        <template v-slot:value> 3 </template>
      </attendance-info>
    </div>
  </main>
</template>

<script>
import AttendanceInfo from "../components/AttendanceInfo.vue";
import DateTime from "../components/DateTime.vue";
export default {
  components: { AttendanceInfo, DateTime },
};
</script>

<style></style>
