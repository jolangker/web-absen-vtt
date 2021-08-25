<template>
  <div class="rounded-md shadow overflow-hidden max-w-sm w-full">
    <div class="bg-blue-700 py-4 text-center">
      <h2 class="text-2xl text-white font-medium">SISWA</h2>
    </div>
    <div class="py-8 px-6 bg-white">
      <form class="flex flex-col" @submit.prevent="login">
        <input
          type="number"
          class="login__form"
          v-model.number="getNisn"
          :class="{ 'ring-blue-400': getNisn }"
          placeholder="NISN"
        />
        <p v-if="!getNisn" class="hidden error__message">
          Harap Masukkan NISN Anda
        </p>
        <button class="btn__login mt-3">LOGIN</button>
        <slot></slot>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  setup() {
    const getNisn = ref("");
    const router = useRouter();

    const loginValidation = () => {
      const errMsg = document.querySelector(".error__message");
      const loginForm = document.querySelector(".login__form");
      errMsg.classList.remove("hidden");
      loginForm.classList.add("ring-red-400");
    };

    const login = () => {
      if (!getNisn.value) return loginValidation();

      const btnLogin = document.querySelector(".btn__login");
      btnLogin.textContent = "Please Wait ...";
      btnLogin.classList.add("cursor-not-allowed", "opacity-50");

      setTimeout(() => {
        router.push({ name: "Home" });
      }, 3000);
    };

    return {
      getNisn,
      login,
    };
  },
};
</script>

<style></style>
