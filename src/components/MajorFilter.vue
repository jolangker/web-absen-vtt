<template>
  <div class="relative w-44">
    <button class="btn btn__blue py-1 w-full" @click="toggleMenu">
      <span v-if="!majorFilter" class="pointer-events-none">Semua Jurusan</span>
      <span v-else class="pointer-events-none">{{ majorFilter }}</span>
    </button>

    <div
      v-show="showMenu"
      class="w-full bg-white absolute rounded border border-blue-400 py-2 mt-1"
    >
      <div v-for="major in majors" :key="major" class="px-4 hover:bg-gray-200">
        <input
          type="radio"
          name="major"
          :id="major.id"
          :value="major.value"
          v-model="majorFilter"
          @change="sendMajorFilter"
          @click="hideMenu"
          class="absolute hidden"
        />
        <label
          :for="major.id"
          class="inline-block py-1 w-full cursor-pointer"
          >{{ major.name }}</label
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  emits: ["sendMajorFilter"],
  setup(_, { emit }) {
    const majors = [
      { name: "Semua Jurusan", value: "", id: "major_All" },
      { name: "KGSP", value: "KGSP", id: "major_KGSP" },
      { name: "SIJA", value: "SIJA", id: "major_SIJA" },
      { name: "TEDK", value: "TEDK", id: "major_TEDK" },
      { name: "TFLM", value: "TFLM", id: "major_TFLM" },
      { name: "TMPO", value: "TMPO", id: "major_TMPO" },
      { name: "TTL", value: "TTL", id: "major_TTL" },
    ];
    const majorFilter = ref("");
    const showMenu = ref(false);

    const sendMajorFilter = (e) => {
      emit("sendMajorFilter", majorFilter.value);
    };

    const toggleMenu = (e) => {
      showMenu.value = !showMenu.value;
    };

    const hideMenu = (e) => {
      showMenu.value = false;
    };

    return {
      majors,
      majorFilter,
      sendMajorFilter,
      showMenu,
      toggleMenu,
      hideMenu,
    };
  },
};
</script>

<style></style>
