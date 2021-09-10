<template>
  <div
    class="
      flex
      items-center
      border-2 border-blue-300
      rounded
      px-2
      bg-white
      text-blue-300
      focus-within:border-blue-500 focus-within:text-blue-600
      hover:border-blue-500 hover:text-blue-600
      duration-300
    "
  >
    <i class="fas fa-search"></i>
    <input
      type="text"
      class="
        ml-2
        w-full
        h-full
        font-medium
        bg-transparent
        placeholder-blue-300
        group-focus:border-red-600
        focus:outline-none
        capitalize
      "
      placeholder="Cari Siswa..."
      v-model="searchFilter"
      @keyup="sendSearchFilter"
    />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  emits: ["sendSearchFilter"],
  setup(_, { emit }) {
    const searchFilter = ref("");

    const sendSearchFilter = (e) => {
      emit("sendSearchFilter", searchFilter.value.toLowerCase());
    };

    return {
      searchFilter,
      sendSearchFilter,
    };
  },
};
</script>

<style></style>
