<template>
  <div>
    <attendance-now />
  </div>
  <div class="mt-4">
    <div class="flex justify-between items-center space-x-6">
      <router-link
        :to="{ name: 'Admin.Absensi.Add' }"
        class="btn btn__blue text-base"
      >
        <i class="fas fa-calendar-plus"></i>
        <span class="ml-3">Tambah Custom Absen</span>
      </router-link>
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
    <table class="mt-1 table__layout">
      <thead class="table__header">
        <tr>
          <td class="header__field">No</td>
          <td class="header__field">NISN</td>
          <td class="header__field">Check In</td>
          <td class="header__field">Check Out</td>
          <td class="header__field text-center">Aksi</td>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!attds.length" class="body__row">
          <td colspan="5" class="text-center font-medium text-lg p-6">
            Tidak Ada Absensi
          </td>
        </tr>
        <tr v-else class="body__row" v-for="attd in attds" :key="attd">
          <td class="body__field">{{ attd.no }}</td>
          <td class="body__field">{{ attd.id_absensi }}</td>
          <td class="body__field">
            {{ new Date(attd.checkin).toLocaleTimeString() }}
          </td>
          <td class="body__field">
            {{
              attd.checkout
                ? `${new Date(attd.checkout).toLocaleTimeString()}`
                : "-"
            }}
          </td>
          <td class="body__field text-center">
            <router-link
              class="btn btn__green"
              :to="{
                name: 'Admin.Absensi.Edit',
                params: { id: attd.id },
              }"
            >
              <i class="fas fa-edit"></i>
              <span class="ml-3">Edit</span>
            </router-link>
            <button class="btn btn__red ml-2" @click="deleteData(attd.id)">
              <i class="fas fa-calendar-times"></i>
              <span class="ml-3"> Delete</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getVariables from "../../../composables/getVariables";
import getDaily from "../../../composables/getDaily";
import Loading from "../../../components/Loading.vue";
import AttendanceNow from "../../../components/AttendanceNow.vue";
import { useRouter } from "vue-router";
export default {
  components: { Loading, AttendanceNow },
  setup() {
    const { urlDaily, urlAbsensi, cors, retToken } = getVariables();
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

    const deleteData = async (id) => {
      const res = await fetch(`${cors}${urlAbsensi}${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        alert("Absensi Berhasil Dihapus");
        router.go(0);
      } catch (err) {
        alert(err);
      }
    };
    return {
      students,
      date,
      attds,
      fetchDaily,
      displayDate,
      deleteData,
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
