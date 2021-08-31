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
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import getVariables from "../composables/getVariables";
import getToken from "../composables/getToken";
export default {
  setup() {
    const router = useRouter();
    const { urlSiswa, cors } = getVariables();
    const username = ref("");
    const password = ref("");
    const admin = ref([]);

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

    const login = async () => {
      if (!username.value || !password.value) return loginValidation();

      const btnLogin = document.querySelector(".btn__login");
      btnLogin.setAttribute("disabled", true);
      btnLogin.textContent = "Please Wait ...";
      btnLogin.classList.add("cursor-not-allowed", "opacity-50");

      const token = await getToken();
      await sessionStorage.setItem("token", token.access);

      const res = await fetch(`${cors}${urlSiswa}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      });

      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();

        admin.value = data.filter((adm) => {
          return (
            adm.username.includes(username.value) &&
            adm.username.includes(username.value)
          );
        });

        if (!admin.value.length) throw "Username/Password Salah";

        sessionStorage.setItem("username", username.value);
        router.push({ name: "Dashboard" });

        btnLogin.removeAttribute("disabled");
        btnLogin.textContent = "Login";
        btnLogin.classList.remove("cursor-not-allowed", "opacity-50");
      } catch (err) {
        alert(err);
        btnLogin.removeAttribute("disabled");
        btnLogin.textContent = "Login";
        btnLogin.classList.remove("cursor-not-allowed", "opacity-50");
      }
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
