<template>
  <button
    v-if="!absence"
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
export default {
  setup() {
    const absence = ref(false);

    const checkIn = () => {
      absence.value = true;
    };

    const checkOut = () => {
      absence.value = false;
    };

    return {
      absence,
      checkIn,
      checkOut,
    };
  },
};
</script>

<style></style>
