<template>
  <div v-if="students.length">
    <div class="mt-5 flex justify-between space-x-4">
      <router-link
        :to="{ name: 'Admin.Siswa.Add' }"
        class="btn btn__blue py-1 px-8"
      >
        <i class="fas fa-user-plus"></i>
        <span class="ml-3">Tambah Siswa</span>
      </router-link>
      <search-filter class="flex-grow" @sendSearchFilter="getSearchFilter" />
      <class-filter @sendClassFilter="getClassFilter" />
      <major-filter @sendMajorFilter="getMajorFilter" />
    </div>
    <table class="table__layout mt-2">
      <thead class="table__header text-center">
        <tr class="p-2">
          <td class="header__field">No</td>
          <td class="header__field">NISN</td>
          <td class="header__field">Name</td>
          <td class="header__field">Kelas</td>
          <td class="header__field">Jurusan</td>
          <td class="header__field w-1/4">Aksi</td>
        </tr>
      </thead>
      <tbody class="text-center capitalize">
        <tr class="body__row" v-if="!filteredData.length">
          <td colspan="6" class="p-8 font-medium text-lg">
            Tidak Ada Data Yang Tersedia
          </td>
        </tr>
        <tr
          class="body__row text-center"
          v-for="student in filteredData"
          :key="student"
        >
          <td class="body__field">{{ student.no }}</td>
          <td class="body__field text-left">{{ student.nisn }}</td>
          <td class="body__field text-left">{{ student.name }}</td>
          <td class="body__field">{{ student.id_kelas }}</td>
          <td class="body__field">{{ student.id_jurusan }}</td>
          <td class="body__field flex justify-center space-x-2">
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
import ClassFilter from "../../../components/ClassFilter.vue";
import SearchFilter from "../../../components/SearchFilter.vue";
import { useRouter } from "vue-router";
export default {
  components: { Loading, MajorFilter, ClassFilter, SearchFilter },
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

    const acceptClassFilter = ref("");
    const getClassFilter = (value) => {
      acceptClassFilter.value = value;
    };

    const acceptSearchFilter = ref("");
    const getSearchFilter = (value) => {
      acceptSearchFilter.value = value;
    };

    const filteredData = computed(() => {
      let no = 1;
      return students.value
        .filter((std) => {
          return (
            std.id_jurusan.includes(acceptMajorFilter.value) &&
            std.id_kelas.includes(acceptClassFilter.value) &&
            std.name.includes(acceptSearchFilter.value)
          );
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
      getClassFilter,
      getSearchFilter,
      filteredData,
    };
  },
};
</script>

<style></style>
