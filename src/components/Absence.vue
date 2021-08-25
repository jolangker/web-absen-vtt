<template>
  <div
    class="
      bg-white
      shadow
      rounded-lg
      flex flex-col
      items-center
      py-10
      border-l-8 border-blue-700
    "
  >
    <date-time />
    <absence-button />
  </div>
</template>

<script>
import DateTime from "../components/DateTime.vue";
import AbsenceButton from "../components/AbsenceButton.vue";
export default {
  components: { DateTime, AbsenceButton },
};
</script>

<style></style>
