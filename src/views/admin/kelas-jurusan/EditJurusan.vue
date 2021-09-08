<template>
  <div class="crud__wrapper">
    <h2 class="crud__header">EDIT JURUSAN</h2>
    <form class="crud" @submit.prevent="updateMajor">
      <div>
        <label for="id_major" class="crud__label">JURUSAN</label>
        <input
          id="id_major"
          type="text"
          class="crud__form"
          v-model="majorID"
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
import { useRoute, useRouter } from "vue-router";
import getVariables from "../../../composables/getVariables";
import BackButton from "../../../components/BackButton.vue";
export default {
  components: { BackButton },
  setup() {
    const { urlJurusan, cors, retToken } = getVariables();
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;
    const majorID = ref("");

    const fetchClass = async () => {
      const res = await fetch(`${cors}${urlJurusan}${id}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        majorID.value = data.id_jurusan;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchClass();

    const updateMajor = async () => {
      const res = await fetch(`${cors}${urlJurusan}${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${retToken}`,
        },
        body: JSON.stringify({
          id_jurusan: majorID.value,
        }),
      });
      try {
        if (!res.ok) throw res.statusText;
        alert("Update Berhasil");
        router.push({ name: "Admin.KJ" });
      } catch (err) {
        alert.err;
      }
    };

    return {
      majorID,
      updateMajor,
    };
  },
};
</script>

<style></style>
