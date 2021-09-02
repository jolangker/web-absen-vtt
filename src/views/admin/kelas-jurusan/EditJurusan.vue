<template>
  <div class="crud__wrapper">
    <h2 class="crud__header">EDIT KELAS</h2>
    <form class="crud" @submit.prevent="updateMajor">
      <div>
        <label for="id_major" class="crud__label">ID</label>
        <input
          id="id_major"
          type="text"
          class="crud__form"
          v-model="majorID"
          readonly
          required
        />
      </div>
      <div>
        <label for="name_major" class="crud__label">Kelas</label>
        <input
          id="name_major"
          type="text"
          class="crud__form"
          v-model="majorName"
          required
        />
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
import getVariables from "../../../composables/getVariables";
import BackButton from "../../../components/BackButton.vue";
export default {
  props: ["id"],
  components: { BackButton },
  setup(props) {
    const { urlJurusan, cors, retToken } = getVariables();
    const router = useRouter();
    const majorID = ref(0);
    const majorName = ref("");

    const fetchClass = async () => {
      const res = await fetch(`${cors}${urlJurusan}${props.id}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        majorID.value = data.id_jurusan;
        majorName.value = data.jurusan;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchClass();

    const updateMajor = async () => {
      const res = await fetch(`${cors}${urlJurusan}${props.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${retToken}`,
        },
        body: JSON.stringify({
          id_jurusan: majorID.value,
          jurusan: majorName.value,
        }),
      });
      try {
        if (!res.ok) throw res.statusText;
        alert("Update Berhasil");
        router.push({ name: "Admin.JK" });
      } catch (err) {
        alert.err;
      }
    };

    return {
      majorID,
      majorName,
      updateMajor,
    };
  },
};
</script>

<style></style>
