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
import { onMounted } from "@vue/runtime-core";
import Pusher from "pusher-js";

export default {
  emits: ["SuccessAction", "WarningAction", "ErrorAction"],
  props: {
    name: String,
  },
  setup(props, { emit }) {
    const { urlAbsensi, urlRT, cors, retToken } = getVariables();
    const router = useRouter();
    const nisn = sessionStorage.getItem("nisn");
    const getStudent = ref([]);
    const id = ref(0);
    const name = ref("");
    const status = ref(false);
    const daily = ref("");

    onMounted(() => {
      const pusher = new Pusher("9c4a66de751481d7442a", {
        cluster: "ap1",
      });

      const channel = pusher.subscribe("absenvttv3");
      channel.bind("absen", fetchData);
    });

    const getDaily = () => {
      const date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();

      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;

      daily.value = `${y}-${m}-${d}`;
    };

    getDaily();

    const fetchData = async () => {
      const res = await fetch(`${cors}${urlAbsensi}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      const data = await res.json();
      getStudent.value = data.filter((student) => {
        return (
          student.id_absensi?.includes(nisn) &&
          student.daily?.includes(daily.value)
        );
      });
      id.value = getStudent.value[0]?.id;
      name.value = getStudent.value[0]?.name;
      status.value = getStudent.value[0]?.checked_in;
    };

    fetchData();

    const checkIn = async () => {
      if (getStudent.value.length >= 1) {
        emit("WarningAction", "Kamu Sudah Absen Hari Ini!");
      } else {
        const res = await fetch(`${cors}${urlRT}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${retToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_absensi: nisn,
            name: props.name,
            status: true,
            checked_in: true,
            checked_out: false,
            daily: daily.value,
            checkin: new Date().toJSON(),
            checkout: null,
          }),
        });
        try {
          if (!res.ok) throw res.statusText;
          status.value = true;
          emit("SuccessAction", "Check In Berhasil!");
        } catch (err) {
          emit("ErrorAction", "Absen Gagal! Harap Login Kembali.");
        }
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
          id_absensi: nisn,
          checked_in: false,
          checked_out: true,
          checkout: new Date().toJSON(),
        }),
      });
      try {
        if (!res.ok) throw res.statusText;
        status.value = false;
        emit("SuccessAction", "Check Out Berhasil!");
      } catch (err) {
        emit("ErrorAction", "Absen Gagal! Harap Login Kembali.");
      }
    };

    return {
      status,
      checkIn,
      checkOut,
      status,
    };
  },
};
</script>

<style></style>
