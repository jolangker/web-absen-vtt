<template>
  <div v-if="filteredData.length">
    <div class="mt-5 flex justify-between">
      <router-link :to="{ name: 'Admin.Siswa.Add' }" class="btn btn__blue py-1">
        <i class="fas fa-user-plus"></i>
        <span class="ml-3">Tambah Siswa</span>
      </router-link>
      <div>
        <major-filter @sendMajorFilter="getMajorFilter" />
      </div>
    </div>
    <table
      class="mt-2 table-auto w-full bg-white shadow border border-blue-400"
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
      <tbody class="text-center capitalize">
        <tr
          class="hover:bg-gray-200 border-t border-blue-400"
          v-for="student in filteredData"
          :key="student"
        >
          <td class="py-3">{{ student.no }}</td>
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
import { computed, ref } from "@vue/reactivity";
import getVariables from "../../../composables/getVariables";
import Loading from "../../../components/Loading.vue";
import MajorFilter from "../../../components/MajorFilter.vue";
import { useRouter } from "vue-router";
export default {
  components: { Loading, MajorFilter },
  setup() {
    const { urlSiswa, cors, retToken } = getVariables();
    const router = useRouter();
    const students = ref([]);

    const fetchData = async () => {
      const res = await fetch(`${cors}${urlSiswa}`, {
        headers: {
          Authorization: `Bearer ${retToken}`,
        },
      });
      try {
        if (!res.ok) throw res.statusText;
        const data = await res.json();
        students.value = data.map((std) => {
          std.name = std.name.toLowerCase();
          return std;
        });
      } catch (err) {
        alert(err);
        router.push({ name: "Admin.Login" });
      }
    };

    fetchData();

    const acceptMajorFilter = ref("");
    const getMajorFilter = (value) => {
      acceptMajorFilter.value = value;
    };

    const filteredData = computed(() => {
      let no = 1;
      return students.value
        .filter((std) => {
          return std.id_jurusan.includes(acceptMajorFilter.value);
        })
        .map((std) => {
          std.no = no++;
          return std;
        });
    });

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
      deleteData,
      getMajorFilter,
      filteredData,
    };
  },
};
</script>

<style></style>
