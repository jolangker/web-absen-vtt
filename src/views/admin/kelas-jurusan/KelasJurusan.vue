<template>
  <div
    class="flex space-x-10 items-start"
    v-if="classes.length || majors.length"
  >
    <table
      class="mt-4 table-auto w-full bg-white shadow border border-blue-400"
    >
      <caption class="mb-3 text-left text-2xl font font-medium">
        KELAS
      </caption>
      <thead class="bg-blue-500 text-center text-white">
        <tr class="p-2">
          <td class="font-semibold py-4">ID</td>
          <td class="font-semibold py-4">Kelas</td>
          <td class="font-semibold py-4 w-1/4">Aksi</td>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr
          class="hover:bg-gray-200 border-t border-blue-400"
          v-for="classs in classes"
          :key="classs"
        >
          <td class="py-3">{{ classs.id_kelas }}</td>
          <td class="py-3">{{ classs.kelas }}</td>
          <td class="py-3">
            <router-link
              class="btn btn__green"
              :to="{
                name: 'Admin.KJ.Edit.Kelas',
                params: { id: classs.id_kelas },
              }"
            >
              <i class="fas fa-pen"></i>
              <span class="ml-3">Edit</span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      class="mt-4 table-auto w-full bg-white shadow border border-blue-400"
    >
      <caption class="mb-3 text-left text-2xl font font-medium">
        JURUSAN
      </caption>
      <thead class="bg-blue-500 text-center text-white">
        <tr class="p-2">
          <td class="font-semibold py-4">ID</td>
          <td class="font-semibold py-4">Jurusan</td>
          <td class="font-semibold py-4 w-1/4">Aksi</td>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr
          class="hover:bg-gray-200 border-t border-blue-400"
          v-for="major in majors"
          :key="major"
        >
          <td class="py-3">{{ major.id_jurusan }}</td>
          <td class="py-3">{{ major.jurusan }}</td>
          <td class="py-3">
            <router-link
              class="btn btn__green"
              :to="{
                name: 'Admin.KJ.Edit.Jurusan',
                params: { id: major.id_jurusan },
              }"
            >
              <i class="fas fa-pen"></i>
              <span class="ml-3">Edit</span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="relative h-full">
    <Loading />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import getVariables from "../../../composables/getVariables";
import Loading from "../../../components/Loading.vue";
export default {
  components: { Loading },
  setup() {
    const { urlKelas, urlJurusan, cors, retToken } = getVariables();
    const router = useRouter();
    const classes = ref([]);
    const majors = ref([]);

    const fetchClasses = async () => {
      const res = await fetch(`${cors}${urlKelas}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        classes.value = data;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    const fetchMajors = async () => {
      const res = await fetch(`${cors}${urlJurusan}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        majors.value = data;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchClasses();
    fetchMajors();

    return {
      classes,
      majors,
    };
  },
};
</script>

<style></style>
