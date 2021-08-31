<template>
  <date-time />
  <div class="mt-14 flex flex-col space-y-5">
    <router-link :to="{ name: 'Admin.Siswa' }">
      <attendance-info>
        <template v-slot:title>Jumlah Siswa</template>
        <template v-slot:value>10</template>
      </attendance-info>
    </router-link>
    <router-link :to="{ name: 'Admin.Absensi' }">
      <attendance-info>
        <template v-slot:title>Jumlah Siswa Yang Sudah Absen</template>
        <template v-slot:value>6</template>
      </attendance-info>
    </router-link>
    <router-link :to="{ name: 'Admin.Absensi' }">
      <attendance-info>
        <template v-slot:title>Jumlah Siswa Yang Belum Absen</template>
        <template v-slot:value>4</template>
      </attendance-info>
    </router-link>
  </div>
</template>

<script>
import DateTime from "../../components/DateTime.vue";
import AttendanceInfo from "../../components/AttendanceInfo.vue";
export default {
  components: { DateTime, AttendanceInfo },
};
</script>

<style></style>
