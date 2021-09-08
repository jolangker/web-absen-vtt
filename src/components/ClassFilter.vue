<template>
  <div class="relative w-44">
    <button class="btn btn__blue py-1 w-full" @click="toggleMenu">
      <span v-if="!classFilter" class="pointer-events-none">Semua Kelas</span>
      <span v-else class="pointer-events-none">Kelas {{ classFilter }}</span>
    </button>

    <div
      v-show="showMenu"
      class="w-full bg-white absolute rounded border border-blue-400 py-2 mt-1"
    >
      <div v-for="cls in classes" :key="cls" class="px-4 hover:bg-gray-200">
        <input
          type="radio"
          name="cls"
          :id="cls.id"
          :value="cls.value"
          v-model="classFilter"
          @change="sendClassFilter"
          @click="hideMenu"
          class="absolute hidden"
        />
        <label :for="cls.id" class="inline-block py-1 w-full cursor-pointer">{{
          cls.name
        }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup(_, { emit }) {
    const classes = [
      { name: "Semua Kelas", value: "", id: "class_All" },
      { name: "Kelas 10", value: "10", id: "class_10" },
      { name: "Kelas 11", value: "11", id: "class_11" },
      { name: "Kelas 12", value: "12", id: "class_12" },
      { name: "Kelas 13", value: "13", id: "class_13" },
    ];
    const classFilter = ref("");
    const showMenu = ref(false);

    const sendClassFilter = (e) => {
      emit("sendClassFilter", classFilter.value);
    };

    const toggleMenu = (e) => {
      showMenu.value = !showMenu.value;
    };

    const hideMenu = (e) => {
      showMenu.value = false;
    };

    return {
      classes,
      classFilter,
      sendClassFilter,
      showMenu,
      toggleMenu,
      hideMenu,
    };
  },
};
</script>

<style></style>
