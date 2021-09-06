<template>
  <div class="crud__wrapper">
    <h2 class="crud__header">TAMBAH SISWA</h2>
    <form class="crud" @submit.prevent="addData">
      <div>
        <label for="id_student" class="crud__label">ID</label>
        <input
          id="id_student"
          type="number"
          class="crud__form"
          v-model="nisn"
          required
        />
      </div>
      <div>
        <label for="name_student" class="crud__label">NAMA</label>
        <input
          id="name_student"
          type="text"
          class="crud__form"
          v-model="name"
          required
        />
      </div>
      <div>
        <label for="username_student" class="crud__label">USERNAME</label>
        <input
          id="username_student"
          type="text"
          class="crud__form"
          v-model="username"
          required
        />
      </div>
      <div>
        <label for="password_student" class="crud__label">PASSWORD</label>
        <input
          id="password_student"
          type="password"
          class="crud__form"
          v-model="password"
          required
        />
      </div>
      <div>
        <label for="class_student" class="crud__label">KELAS</label>
        <select
          id="class_student"
          class="crud__form appearance-none cursor-pointer"
          v-model="id_kelas"
          required
        >
          <option disabled selected value="">Pilih Kelas</option>
          <option value="1">X</option>
          <option value="2">XI</option>
          <option value="3">XII</option>
          <option value="4">XIII</option>
        </select>
      </div>
      <div>
        <label for="major_student" class="crud__label">Jurusan</label>
        <select
          id="major_student"
          class="crud__form appearance-none cursor-pointer"
          v-model="id_jurusan"
          required
        >
          <option disabled selected value="">Pilih Jursan</option>
          <option value="1">KGSP</option>
          <option value="2">SIJA</option>
          <option value="3">TEDK</option>
          <option value="4">TFLM</option>
          <option value="5">TMPO</option>
          <option value="6">TTL</option>
        </select>
      </div>

      <button type="submit" class="btn btn__green py-2 px-6">
        <i class="fas fa-user-plus"></i>
        <span class="ml-3">Tambah User</span>
      </button>
    </form>
    <back-button />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import BackButton from "../../../components/BackButton.vue";
import getVariables from "../../../composables/getVariables";
import { useRouter } from "vue-router";
export default {
  components: { BackButton },
  setup() {
    const { urlSiswa, cors, retToken } = getVariables();
    const router = useRouter();
    const nisn = ref("");
    const name = ref("");
    const username = ref("");
    const password = ref("");
    const id_kelas = ref("");
    const id_jurusan = ref("");

    const addData = async () => {
      const res = await fetch(`${cors}${urlSiswa}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${retToken}`,
        },
        body: JSON.stringify({
          nisn: nisn.value,
          name: name.value,
          username: username.value,
          password: password.value,
          id_kelas: id_kelas.value,
          id_jurusan: id_jurusan.value,
        }),
      });
      try {
        if (!res.ok) throw res.statusText;
        alert("Siswa Berhasil Ditambahkan");
        router.push({ name: "Admin.Siswa" });
      } catch (err) {
        alert.err;
      }
    };

    return {
      nisn,
      name,
      username,
      password,
      id_kelas,
      id_jurusan,
      addData,
    };
  },
};
</script>

<style></style>
