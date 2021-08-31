<template>
  <div class="text-center text-blue-400">
    <h2 class="font-orbitron font-medium text-6xl lg:text-8xl">
      {{ time }}
    </h2>
    <p class="mt-3 font-semibold text-lg lg:text-2xl">{{ date }}</p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const time = ref("");
    const date = ref("");

    const showTime = () => {
      const dates = new Date();
      let h = dates.getHours();
      let m = dates.getMinutes();
      let s = dates.getSeconds();

      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;

      time.value = `${h}:${m}:${s}`;

      setTimeout(showTime, 1000);
    };

    showTime();

    const showDate = () => {
      const dates = new Date();
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

      date.value = `${dayList[day]}, ${dat} ${monthList[month]} ${year}`;
    };

    showDate();

    return {
      time,
      date,
    };
  },
};
</script>

<style></style>
