<template>
  <div class="rounded-md shadow overflow-hidden max-w-sm w-full">
    <div class="bg-blue-700 py-4 text-center">
      <h2 class="text-2xl text-white font-medium">ADMIN</h2>
    </div>
    <div class="py-8 px-6 bg-white">
      <form class="flex flex-col" @submit.prevent="login">
        <input
          id="username"
          type="text"
          class="login__form"
          placeholder="Username"
          v-model="username"
          :class="{ 'ring-blue-400': username }"
        />
        <p v-if="!username" class="hidden error__message">
          Harap Masukkan Username
        </p>

        <input
          id="password"
          type="password"
          class="login__form mt-5"
          placeholder="Password"
          v-model="password"
          :class="{ 'ring-blue-400': password }"
        />
        <p v-if="!password" class="hidden error__message">
          Harap Masukkan Password
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
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    const loginValidation = () => {
      if (!username.value) {
        const getUsername = document.querySelector("#username");
        const errMsg = getUsername.nextElementSibling;

        getUsername.classList.add("ring-red-400");
        errMsg.classList.remove("hidden");
      }
      if (!password.value) {
        const getPassword = document.querySelector("#password");
        const errMsg = getPassword.nextElementSibling;

        getPassword.classList.add("ring-red-400");
        errMsg.classList.remove("hidden");
      }
    };

    const login = () => {
      if (!username.value || !password.value) return loginValidation();

      const btnLogin = document.querySelector(".btn__login");
      btnLogin.textContent = "Please Wait ...";
      btnLogin.classList.add("cursor-not-allowed", "opacity-50");

      setTimeout(() => {
        router.push({ name: "Admin" });
      }, 3000);
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>

<style></style>
