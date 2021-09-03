<template>
  <div class="flex justify-between items-center space-x-6">
    <button class="btn btn__blue text-base">
      <i class="fas fa-calendar-plus"></i>
      <span class="ml-3">Tambah Custom Absen</span>
    </button>
    <span class="btn bg-blue-500 flex-grow text-center">
      {{ displayDate }}
    </span>
    <input
      type="date"
      class="
        shadow
        rounded
        bg-blue-500
        text-white
        px-4
        text-lg text-right
        hover:bg-blue-600
        focus:outline-none focus:border-blue-600
        font-mono
        duration-300
      "
      v-model="date"
      @change="fetchDaily"
    />
  </div>
  <table
    class="
      mt-2
      table-auto
      w-full
      bg-white
      shadow
      border border-blue-400 border-t-0
    "
  >
    <thead class="bg-blue-500 text-white">
      <tr>
        <td class="font-semibold py-4 px-6">No</td>
        <td class="font-semibold py-4 px-6">NISN</td>
        <td class="font-semibold py-4 px-6">Check In</td>
        <td class="font-semibold py-4 px-6 w-1/4">Check Out</td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-if="!attds.length"
        class="hover:bg-gray-200 border-t border-blue-400"
      >
        <td colspan="4" class="text-center font-medium text-lg p-6">
          Tidak Ada Absensi
        </td>
      </tr>
      <tr
        v-else
        class="hover:bg-gray-200 border-t border-blue-400"
        v-for="attd in attds"
        :key="attd"
      >
        <td class="py-3 px-6">{{ attd.no }}</td>
        <td class="py-3 px-6">{{ attd.id_absensi }}</td>
        <td class="py-3 px-6">
          {{ new Date(attd.checkin).toLocaleTimeString() }}
        </td>
        <td class="py-3 px-6">
          {{
            attd.checkout
              ? `${new Date(attd.checkout).toLocaleTimeString()}`
              : "-"
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref } from "@vue/reactivity";
import getVariables from "../../../composables/getVariables";
import getDaily from "../../../composables/getDaily";
import Loading from "../../../components/Loading.vue";
import { useRouter } from "vue-router";
export default {
  components: { Loading },
  setup() {
    const { urlDaily, cors, retToken } = getVariables();
    const { daily } = getDaily();
    const date = ref(daily);
    const router = useRouter();
    const students = ref([]);
    const attds = ref([]);
    const displayDate = ref("");

    const fetchDaily = async () => {
      let no = 1;
      const res = await fetch(`${cors}${urlDaily}${date.value}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        attds.value = data.map((x) => {
          x.no = no++;
          return x;
        });
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      } finally {
        showDate();
      }
    };

    fetchDaily();

    const showDate = () => {
      const dates = new Date(date.value);
      let dayList = [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
        "Minggu",
      ];
      let monthList = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      let day = dates.getDay();
      let dat = dates.getDate();
      let month = dates.getMonth();
      let year = dates.getFullYear();

      displayDate.value = `${dayList[day]}, ${dat} ${monthList[month]} ${year}`;
    };

    showDate();

    return {
      students,
      date,
      attds,
      fetchDaily,
      displayDate,
    };
  },
};
</script>

<style>
::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}
</style>
