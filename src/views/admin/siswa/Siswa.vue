<template>
  <table
    v-if="students.length"
    class="table-auto w-full bg-white shadow border border-blue-400"
  >
    <thead class="bg-blue-500 text-center text-white">
      <tr class="p-2">
        <td class="font-semibold py-4">No</td>
        <td class="font-semibold py-4">NISN</td>
        <td class="font-semibold py-4">Name</td>
        <td class="font-semibold py-4">Kelas</td>
        <td class="font-semibold py-4">Jurusan</td>
        <td class="font-semibold py-4 w-1/4">Aksi</td>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr
        class="hover:bg-gray-200 border-t border-blue-400"
        v-for="student in students"
        :key="student"
      >
        <td class="py-3">{{ no }}</td>
        <td class="py-3">{{ student.nisn }}</td>
        <td class="py-3">{{ student.name }}</td>
        <td class="py-3">{{ student.id_kelas }}</td>
        <td class="py-3">{{ student.id_jurusan }}</td>
        <td class="py-3 flex justify-center space-x-2">
          <router-link
            class="btn__edit"
            :to="{ name: 'Admin.Siswa.Edit', params: { id: student.nisn } }"
          >
            <i class="fas fa-user-edit"></i>
            <span class="ml-3">Edit</span>
          </router-link>
          <router-link
            class="btn__delete"
            :to="{ name: 'Admin.Siswa.Delete', params: { id: student.nisn } }"
          >
            <i class="fas fa-user-minus"></i>
            <span class="ml-3">Delete</span>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else class="relative h-full">
    <Loading />
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getVariables from "../../../composables/getVariables";
import Loading from "../../../components/Loading.vue";
export default {
  components: { Loading },
  setup() {
    const { urlSiswa, cors, retToken } = getVariables();
    const students = ref([]);
    const no = ref(1);

    const fetchData = async () => {
      const res = await fetch(`${cors}${urlSiswa}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      const data = await res.json();
      students.value = data;
    };

    fetchData();

    return {
      students,
      no,
    };
  },
};
</script>

<style></style>
