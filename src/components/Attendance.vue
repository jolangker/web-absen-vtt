<template>
  <div
    class="
      relative
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
    <attend-button
      :name="name"
      @SuccessAction="triggerSuccess"
      @WarningAction="triggerWarning"
      @ErrorAction="triggerError"
    />
    <transition-group name="slide">
      <alert-success v-if="successAlert">{{ alertMsg }}</alert-success>
      <alert-warning v-if="warningAlert">{{ alertMsg }}</alert-warning>
      <alert-error v-if="errorAlert">{{ alertMsg }}</alert-error>
    </transition-group>
  </div>
</template>

<script>
import DateTime from "./DateTime.vue";
import AttendButton from "./AttendButton.vue";
import AlertSuccess from "./AlertSuccess.vue";
import AlertWarning from "./AlertWarning.vue";
import AlertError from "./AlertError.vue";
import { ref } from "@vue/reactivity";
export default {
  components: {
    DateTime,
    AttendButton,
    AlertSuccess,
    AlertWarning,
    AlertError,
  },
  props: {
    name: String,
  },
  setup() {
    const successAlert = ref(false);
    const warningAlert = ref(false);
    const errorAlert = ref(false);
    const alertMsg = ref("");

    const triggerSuccess = (val) => {
      successAlert.value = true;
      alertMsg.value = val;

      setTimeout(() => (successAlert.value = false), 3000);
    };

    const triggerWarning = (val) => {
      warningAlert.value = true;
      alertMsg.value = val;

      setTimeout(() => (warningAlert.value = false), 3000);
    };

    const triggerError = (val) => {
      errorAlert.value = true;
      alertMsg.value = val;

      setTimeout(() => (errorAlert.value = false), 3000);
    };

    return {
      successAlert,
      warningAlert,
      errorAlert,
      alertMsg,
      triggerSuccess,
      triggerWarning,
      triggerError,
    };
  },
};
</script>

<style>
.slide-enter-active {
  animation: slide_in 0.5s forwards ease;
}

@keyframes slide_in {
  0% {
    transform: translateX(200px);
  }
  50% {
    transform: translateX(-40px);
  }
  100% {
    transform: translateX(0px);
  }
}

.slide-leave-active {
  animation: slide_out 0.5s forwards ease;
}

@keyframes slide_out {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-80px);
  }
  100% {
    transform: translateX(400px);
  }
}
</style>
