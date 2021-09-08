<template>
  <div class="crud__wrapper">
    <h2 class="crud__header">EDIT KELAS</h2>
    <form class="crud" @submit.prevent="updateClass">
      <div>
        <label for="id_class" class="crud__label">KELAS</label>
        <input
          id="id_class"
          type="text"
          class="crud__form"
          v-model="classID"
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
    const { urlKelas, cors, retToken } = getVariables();
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;
    const classID = ref(0);

    const fetchClass = async () => {
      const res = await fetch(`${cors}${urlKelas}${id}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        classID.value = data.id_kelas;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchClass();

    const updateClass = async () => {
      const res = await fetch(`${cors}${urlKelas}${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${retToken}`,
        },
        body: JSON.stringify({
          id_kelas: classID.value,
        }),
      });
      try {
        if (!res.ok) throw res.statusText;
        alert("Update Berhasil");
        router.push({ name: "Admin.KJ" });
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    return {
      classID,
      updateClass,
    };
  },
};
</script>

<style></style>
