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
    const url = "https://absenvtt.herokuapp.com/api/Siswa/?format=json";
    const cors = "https://cors-anywhere.herokuapp.com/";
    const user = ref([]);

    const formValidation = () => {
      const errMsg = document.querySelector(".error__message");
      const loginForm = document.querySelector(".login__form");
      errMsg.classList.remove("hidden");
      loginForm.classList.add("ring-red-400");
    };

    const login = async () => {
      if (!getNisn.value) return formValidation();

      const btnLogin = document.querySelector(".btn__login");
      btnLogin.setAttribute("disabled", true);
      btnLogin.textContent = "Please Wait ...";
      btnLogin.classList.add("cursor-not-allowed", "opacity-50");

      const res = await fetch(`${cors}${url}`);

      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();

        user.value = data.filter((nisn) => {
          return nisn.nisn.includes(getNisn.value);
        });

        if (!user.value.length) throw "NISN Tidak Ditemukan";
        sessionStorage.setItem("nisn", user.value[0].nisn);
        router.push({ name: "Home" });
      } catch (err) {
        alert(err);
        btnLogin.removeAttribute("disabled");
        btnLogin.textContent = "Login";
        btnLogin.classList.remove("cursor-not-allowed", "opacity-50");
      }
    };

    return {
      getNisn,
      login,
    };
  },
};
</script>

<style></style>
