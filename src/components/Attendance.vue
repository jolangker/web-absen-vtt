<template>
  <div
    class="
      bg-white
      shadow
      rounded-lg
      flex flex-col
      items-center
      py-16
      lg:py-32
      border-t-8 border-blue-700
    "
  >
    <date-time />
    <attend-button :name="name" />
  </div>
</template>

<script>
import DateTime from "./DateTime.vue";
import AttendButton from "./AttendButton.vue";
export default {
  components: { DateTime, AttendButton },
  props: {
    name: String,
  },
};
</script>

<style></style>
