<template>
  <div class="crud__wrapper">
    <h2 class="crud__header">EDIT {{ nisn }} ABSENSI</h2>
    <form class="crud" @submit.prevent="updateData">
      <div>
        <label for="id_attd" class="crud__label">ID ABSENSI</label>
        <input
          type="number"
          id="id_attd"
          class="crud__form"
          v-model="id"
          readonly
        />
      </div>
      <div>
        <label for="nisn_attd" class="crud__label">NISN</label>
        <input
          type="number"
          id="nisn_attd"
          class="crud__form"
          v-model="nisn"
          readonly
        />
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
        />
      </div>
      <div>
        <label for="checkout_time" class="crud__label">WAKTU CHECKOUT</label>
        <input
          id="checkout_time"
          type="time"
          class="crud__form"
          v-model="checkout_input"
        />
      </div>
      <button type="submit" class="btn btn__green py-2 px-6">
        <i class="fas fa-calendar-check"></i>
        <span class="ml-3">Update Absensi</span>
      </button>
    </form>
    <back-button />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import BackButton from "../../../components/BackButton.vue";
import getVariables from "../../../composables/getVariables";
export default {
  components: { BackButton },
  setup() {
    const { urlAbsensi, cors, retToken } = getVariables();
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;
    const nisn = ref("");
    const daily = ref("");
    const checkin_input = ref("");
    const checkout_input = ref("");
    const student = ref();

    const getTime = (time) => {
      const d = new Date(time);
      let h = d.getHours();
      let m = d.getMinutes();

      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;

      return `${h}:${m}`;
    };

    const fetchData = async () => {
      const res = await fetch(`${cors}${urlAbsensi}${id}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        data.checkin = getTime(data.checkin);
        data.checkout = data.checkout ? getTime(data.checkout) : null;
        nisn.value = data.id_absensi;
        daily.value = data.daily;
        checkin_input.value = data.checkin;
        checkout_input.value = data.checkout;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchData();

    const updateData = async () => {
      const checkin = `${daily.value}T${checkin_input.value}+07:00`;
      const checkout = `${daily.value}T${checkout_input.value}+07:00`;

      const res = await fetch(`${cors}${urlAbsensi}${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${retToken}`,
        },
        body: JSON.stringify({
          daily: daily.value,
          checkin: checkin,
          checkout: checkout_input.value ? checkout : null,
          checked_out: checkout_input.value ? true : false,
        }),
      });
      try {
        if (!res.ok) throw res.statusText;
        alert("Absensi Berhasil Dirubah");
        router.push({ name: "Admin.Absensi" });
      } catch (err) {
        alert(err);
      }
    };

    return {
      id,
      nisn,
      daily,
      checkin_input,
      checkout_input,
      student,
      updateData,
    };
  },
};
</script>

<style></style>
