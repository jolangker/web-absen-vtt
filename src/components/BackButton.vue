<template>
  <button class="btn btn__blue py-2 px-6" @click="back">
    <i class="fas fa-long-arrow-alt-left"></i>
    <span class="ml-2">Back</span>
  </button>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const back = () => {
      router.go(-1);
    };
    return {
      back,
    };
  },
};
</script>

<style></style>
