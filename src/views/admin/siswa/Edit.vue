<template>
  <div class="crud__wrapper">
    <h2 class="crud__header">EDIT {{ student.name }}</h2>
    <form class="crud" @submit.prevent="updateData">
      <div>
        <label for="id_student" class="crud__label">ID</label>
        <input
          id="id_student"
          type="text"
          class="crud__form"
          v-model="nisn"
          readonly
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
          type="text"
          class="crud__form"
          v-model="password"
          required
        />
      </div>
      <div>
        <label for="class_student" class="crud__label">KELAS</label>
        <select
          id="class_student"
          class="block w-full crud__form"
          v-model="id_kelas"
          required
        >
          <option disabled selected>Pilih Kelas</option>
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
          class="block w-full crud__form"
          v-model="id_jurusan"
          required
        >
          <option disabled selected>Pilih Jursan</option>
          <option value="1">KGSP</option>
          <option value="2">SIJA</option>
          <option value="3">TEDK</option>
          <option value="4">TFLM</option>
          <option value="5">TMPO</option>
          <option value="6">TTL</option>
        </select>
      </div>

      <button type="submit" class="btn btn__green py-2 px-6">
        <span class="mr-2">Update</span>
        <i class="fas fa-check-circle"></i>
      </button>
    </form>
    <back-button />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import BackButton from "../../../components/BackButton.vue";
import getVariables from "../../../composables/getVariables";
export default {
  props: ["id"],
  components: { BackButton },
  setup(props) {
    const { urlSiswa, cors, retToken } = getVariables();
    const router = useRouter();
    const student = ref({});

    const nisn = ref("");
    const name = ref("");
    const username = ref("");
    const password = ref("");
    const id_kelas = ref(0);
    const id_jurusan = ref(0);

    const back = () => {
      router.go(-1);
    };

    const fetchData = async () => {
      const res = await fetch(`${cors}${urlSiswa}${props.id}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });

      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        student.value = data;
        nisn.value = student.value.nisn;
        name.value = student.value.name;
        username.value = student.value.username;
        password.value = student.value.password;
        id_kelas.value = student.value.id_kelas;
        id_jurusan.value = student.value.id_jurusan;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchData();

    const updateData = async () => {
      const res = await fetch(`${cors}${urlSiswa}${props.id}/`, {
        method: "PATCH",
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
        alert("Update Berhasil");
        router.push({ name: "Admin.Siswa" });
      } catch (err) {
        alert.err;
      }
    };

    return {
      student,
      nisn,
      name,
      username,
      password,
      id_kelas,
      id_jurusan,
      back,
      updateData,
    };
  },
};
</script>

<style></style>
