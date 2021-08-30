<template>
  <button
    v-if="!status"
    @click="checkIn"
    class="
      mt-6
      py-3
      px-10
      bg-blue-400
      text-white text-lg
      font-medium
      rounded
      hover:bg-blue-700
      duration-300
    "
  >
    Check In
  </button>
  <button
    v-else
    @click="checkOut"
    class="
      mt-6
      py-3
      px-10
      bg-red-400
      text-white text-lg
      font-medium
      rounded
      hover:bg-red-600
      duration-300
    "
  >
    Check Out
  </button>
</template>

<script>
import { ref } from "@vue/reactivity";
import getVariables from "../composables/getVariables";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { urlAbsensi, cors, retToken } = getVariables();
    const router = useRouter();
    const nisn = sessionStorage.getItem("nisn");
    const getStudent = ref([]);
    const id = ref(0);
    const status = ref(null);

    const fetchData = async () => {
      const res = await fetch(`${cors}${urlAbsensi}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      const data = await res.json();
      getStudent.value = data.filter((student) => {
        return student.id_absensi.includes(nisn);
      });
      id.value = getStudent.value[0].id;
      status.value = getStudent.value[0].status;
      console.log(status.value);
    };

    fetchData();

    const checkIn = async () => {
      const res = await fetch(`${cors}${urlAbsensi}${id.value}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${retToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: true,
          checkin: new Date().toJSON(),
        }),
      });
      try {
        if (!res.ok) throw res.statusText;
        status.value = true;
        alert("Check In Berhasil");
      } catch (err) {
        alert(err);
        router.push({ name: "Login" });
      }
    };

    const checkOut = async () => {
      const res = await fetch(`${cors}${urlAbsensi}${id.value}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${retToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: false,
          checkout: new Date().toJSON(),
        }),
      });
      try {
        if (!res.ok) throw res.statusText;
        status.value = false;
        alert("Check Out Berhasil");
      } catch (err) {
        alert(err);
        router.push({ name: "Login" });
      }
    };

    return {
      status,
      checkIn,
      checkOut,
    };
  },
};
</script>

<style></style>
