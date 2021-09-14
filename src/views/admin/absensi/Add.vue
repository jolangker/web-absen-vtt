<template>
  <div class="crud__wrapper">
    <h2 class="crud__header">TAMBAH CUSTOM ABSENSI</h2>
    <form class="crud" @submit.prevent="addData">
      <div>
        <label for="nisn" class="crud__label">NISN</label>
        <select
          id="nisn"
          class="crud__form appearance-none cursor-pointer"
          v-model="nisn"
          required
        >
          <option value="" selected disabled>Pilih Siswa</option>
          <option
            v-for="student in students"
            :key="student"
            :value="student.nisn"
          >
            {{ student.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="daily" class="crud__label">HARI</label>
        <input
          id="daily"
          type="date"
          class="crud__form"
          v-model="daily"
          required
        />
      </div>
      <div>
        <label for="checkin_time" class="crud__label">WAKTU CHECKIN</label>
        <input
          id="checkin_time"
          type="time"
          class="crud__form"
          v-model="checkin_input"
          required
        />
      </div>
      <div>
        <label for="checkout_time" class="crud__label">WAKTU CHECKOUT</label>
        <input
          id="checkout_time"
          type="time"
          class="crud__form"
          v-model="checkout_input"
          required
        />
      </div>
      <button type="submit" class="btn btn__green py-2 px-6">
        <i class="fas fa-calendar-check"></i>
        <span class="ml-3">Tambah Absensi</span>
      </button>
    </form>
    <back-button />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import BackButton from "../../../components/BackButton.vue";
import getVariables from "../../../composables/getVariables";
import { useRouter } from "vue-router";
export default {
  components: { BackButton },
  setup() {
    const { urlSiswa, urlAbsensi, urlRT, cors, retToken } = getVariables();
    const router = useRouter();
    const nisn = ref("");
    const daily = ref("");
    const checkin_input = ref("");
    const checkout_input = ref("");
    const students = ref([]);

    const fetchData = async () => {
      const res = await fetch(`${cors}${urlSiswa}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        students.value = await res.json();
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchData();

    const addData = async () => {
      const checkin = `${daily.value}T${checkin_input.value}+07:00`;
      const checkout = `${daily.value}T${checkout_input.value}+07:00`;

      const res = await fetch(`${cors}${urlRT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${retToken}`,
        },
        body: JSON.stringify({
          id_absensi: nisn.value,
          daily: daily.value,
          status: true,
          checkin: checkin,
          checkout: checkout ? checkout : null,
          checked_in: true,
          checked_out: checkout ? true : false,
        }),
      });
      try {
        if (!res.ok) throw res.statusText;
        alert("Absensi Berhasil Ditambahkan!");
        router.push({ name: "Admin.Absensi.Histori" });
      } catch (err) {
        alert(err);
      }
    };

    return {
      nisn,
      daily,
      checkin_input,
      checkout_input,
      addData,
      students,
    };
  },
};
</script>

<style></style>
