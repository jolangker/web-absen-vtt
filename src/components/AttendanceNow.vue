<template>
  <div class="btn bg-blue-500 text-center text-lg">Absensi Hari Ini</div>
  <table class="table__layout mt-1">
    <thead class="table__header">
      <tr class="header__row text-center">
        <td class="header__field py-2 px-6">No</td>
        <td class="header__field py-2 px-6">NISN</td>
        <td class="header__field py-2 px-6">Waktu Absen</td>
        <td class="header__field py-2 px-6">Sudah Absen</td>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!students.length" class="body__row">
        <td colspan="5" class="text-center font-medium text-lg p-6">
          Belum Ada Absensi
        </td>
      </tr>
      <tr
        class="body__row text-center"
        v-for="student in students"
        :key="student"
      >
        <td class="body__field">{{ student.no }}</td>
        <td class="body__field">{{ student.id_absensi }}</td>
        <td class="body__field">
          {{ new Date(student.checkin).toLocaleTimeString() }}
        </td>
        <td class="body__field">
          <i class="fas fa-check-circle text-green-500"></i>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref } from "@vue/reactivity";
import getDaily from "../composables/getDaily";
import getVariables from "../composables/getVariables";
export default {
  setup() {
    const { daily } = getDaily();
    const { urlDaily, cors, retToken } = getVariables();
    const students = ref([]);

    const fetchData = async () => {
      let no = 1;
      const res = await fetch(`${cors}${urlDaily}${daily}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        students.value = data.map((std) => {
          std.no = no++;
          return std;
        });
      } catch (err) {
        alert(err);
      }
    };

    fetchData();

    return {
      students,
    };
  },
};
</script>

<style></style>
