<template>
  <div v-if="students.length">
    <div class="mt-5">
      <router-link :to="{ name: 'Admin.Siswa.Add' }" class="btn btn__blue py-2">
        <i class="fas fa-user-plus"></i>
        <span class="ml-3">Tambah Siswa</span>
      </router-link>
    </div>
    <table
      class="mt-4 table-auto w-full bg-white shadow border border-blue-400"
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
          <td class="py-3">{{ no++ }}</td>
          <td class="py-3">{{ student.nisn }}</td>
          <td class="py-3">{{ student.name }}</td>
          <td class="py-3">{{ student.id_kelas }}</td>
          <td class="py-3">{{ student.id_jurusan }}</td>
          <td class="py-3 flex justify-center space-x-2">
            <router-link
              class="btn btn__green"
              :to="{ name: 'Admin.Siswa.Edit', params: { id: student.nisn } }"
            >
              <i class="fas fa-user-edit"></i>
              <span class="ml-3">Edit</span>
            </router-link>
            <button class="btn btn__red" @click="deleteData(student.nisn)">
              <i class="fas fa-user-minus"></i>
              <span class="ml-3">Delete</span>
            </button>
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
import getVariables from "../../../composables/getVariables";
import Loading from "../../../components/Loading.vue";
import { useRouter } from "vue-router";
export default {
  components: { Loading },
  setup() {
    const { urlSiswa, cors, retToken } = getVariables();
    const router = useRouter();
    const students = ref([]);
    let no = 1;

    const fetchData = async () => {
      const res = await fetch(`${cors}${urlSiswa}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        students.value = data;
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchData();

    const deleteData = async (id) => {
      if (confirm("Are You Sure?")) {
        const res = await fetch(`${cors}${urlSiswa}${id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${retToken}`,
          },
        });
        try {
          if (!res.ok) throw res.statusText;
          router.go();
        } catch (err) {
          alert(err);
          router.push({ name: "Admin.Login" });
        }
      }
    };

    return {
      students,
      no,
      deleteData,
    };
  },
};
</script>

<style></style>
