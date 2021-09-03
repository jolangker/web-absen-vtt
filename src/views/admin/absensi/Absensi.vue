<template>
  <div class="flex justify-end">
    <input
      type="date"
      class="
        p-1
        shadow
        rounded
        bg-blue-500
        text-white
        px-4
        text-xl text-center
        focus:outline-none focus:border-blue-600
        font-mono
      "
      v-model="getDate"
      @change="fetchDaily"
    />
  </div>
  <table class="mt-2 table-auto w-full bg-white shadow border border-blue-400">
    <thead class="bg-blue-500 text-white">
      <tr class="">
        <td class="font-semibold py-4 px-6">No</td>
        <td class="font-semibold py-4 px-6">NISN</td>
        <td class="font-semibold py-4 px-6">Check In</td>
        <td class="font-semibold py-4 px-6 w-1/4">Check Out</td>
      </tr>
    </thead>
    <tbody class="">
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
    const getDate = ref(daily);
    const router = useRouter();
    const students = ref([]);
    const attds = ref([]);

    const fetchDaily = async () => {
      let no = 1;
      const res = await fetch(`${cors}${urlDaily}${getDate.value}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        const data = await res.json();
        attds.value = data.map((x) => {
          x.no = no++;
          return x;
        });
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchDaily();

    return {
      students,
      getDate,
      attds,
      fetchDaily,
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
