<template>
  <div class="crud__wrapper">
    <h2 class="crud__header">EDIT KELAS</h2>
    <form class="crud" @submit.prevent="updateClass">
      <div>
        <label for="id_class" class="crud__label">ID</label>
        <input
          id="id_class"
          type="text"
          class="crud__form"
          v-model="classID"
          readonly
          required
        />
      </div>
      <div>
        <label for="name_class" class="crud__label">Kelas</label>
        <input
          id="name_class"
          type="text"
          class="crud__form"
          v-model="className"
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
    const { urlKelas, cors, retToken } = getVariables();
    const router = useRouter();
    const classID = ref(0);
    const className = ref("");

    const fetchClass = async () => {
      const res = await fetch(`${cors}${urlKelas}${props.id}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        classID.value = data.id_kelas;
        className.value = data.kelas;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchClass();

    const updateClass = async () => {
      const res = await fetch(`${cors}${urlKelas}${props.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${retToken}`,
        },
        body: JSON.stringify({
          id_kelas: classID.value,
          kelas: className.value,
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
      classID,
      className,
      updateClass,
    };
  },
};
</script>

<style></style>
